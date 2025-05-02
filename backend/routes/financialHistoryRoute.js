import express from "express";
import { getDb, connectToServer } from "../config/db.js";
import { ObjectId } from 'mongodb';
import { PDFDocument, rgb } from "pdf-lib";


let financialHistoryRoute = express.Router();

financialHistoryRoute.get('/FinancialHistory', async (req, res) => {
  await connectToServer();
  let db = getDb();
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = 10; // Items per page
  const skip = (page - 1) * limit;

  try {
    const transactions = await db.collection("FinancialHistory")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    // Count the total number of transactions
    const totalTransactions = await db.collection("FinancialHistory").countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalTransactions / limit);
    const totalBalance = await db.collection("FinancialHistory")
    .aggregate([
      { $match: { status: { $regex: /^pending$/i } } }, // Match only pending transactions
      { $group: { _id: null, total: { $sum: "$amount" } } }, // Sum the amounts
    ])
    .toArray();

  const totalBalanceDue = totalBalance.length > 0 ? totalBalance[0].total : 0;

    if (transactions.length > 0) {
      res.json({
        transactions,
        totalPages,
        currentPage: page,
        totalBalanceDue: totalBalance.length > 0 ? totalBalance[0].total : 0,
      });
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (err) {
    console.error("Error fetching financial history:", err);
    res.status(500).json({ error: "Failed to fetch financial history" });
  }
});

//Retrieve financial history by ID
financialHistoryRoute.route('/FinancialHistory/:id').get(async (req, res) => {
  let db = getDb();
  let id = req.params.id;
  let data = await db.collection("FinancialHistory").findOne({ _id: ObjectId(id) });
  if (data) {
    res.json(data);
  } else {
    throw new Error("No data found");
  }
})

financialHistoryRoute.get('/FinancialHistory/:id/download', async (req, res) => {
  await connectToServer();
  let db = getDb();
  const id = req.params.id;

  try {
    console.log("Transaction ID:", id);

    // Fetch the specific transaction by ID
    const transaction = await db.collection("FinancialHistory").findOne({ _id: new ObjectId(id) });

    if (!transaction) {
      console.error("Transaction not found");
      return res.status(404).json({ message: "Transaction not found" });
    }

    console.log("Transaction Data:", transaction);

    // Create a new PDF document
    console.log("Creating PDF document...");
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Add content to the PDF
    console.log("Adding content to PDF...");
    page.drawText(`Transaction Details`, { x: 50, y: 350, size: 20, color: rgb(0, 0, 0) });
    page.drawText(`Date: ${transaction.date}`, { x: 50, y: 320, size: 14 });
    page.drawText(`Service: ${transaction.service}`, { x: 50, y: 300, size: 14 });
    page.drawText(`Amount: $${transaction.amount.toFixed(2)}`, { x: 50, y: 280, size: 14 });
    page.drawText(`Status: ${transaction.status}`, { x: 50, y: 260, size: 14 });

    // Serialize the PDF to bytes
    console.log("Saving PDF...");
    const pdfBytes = await pdfDoc.save();

    // Set the response headers to serve the PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="transaction_${id}.pdf"`);
    res.send(Buffer.from(pdfBytes));
    console.log("PDF generated successfully");
  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

//Create new financial history entry
financialHistoryRoute.route("/FinancialHistory").post(async (req, res) => {
  let db = getDb() // Get the database instance
  let mongoObject = {
      date: req.body.date,
      amount: req.body.amount,
      service: req.body.service,
      status: req.body.status
  }
  let data = await db.collection("/FinancialHistory").insertOne(mongoObject)
  res.json(data)
})

//Update one financial history entry
financialHistoryRoute.route("/FinancialHistory/:id").put(async (req, res) => {
  let db = getDb()
  let id = req.params.id
  let mongoObject = {
    date: req.body.date,
    amount: req.body.amount,
    service: req.body.service,
    status: req.body.status
  }
  let data = await db.collection("FinancialHistory").updateOne({ _id: ObjectId(id) }, { $set: mongoObject })
  res.json(data)
})
//Delete one financial history entry
financialHistoryRoute.route("/FinancialHistory/:id").delete(async (req, res) => {
  let db = getDb()
  let id = req.params.id
  let data = await db.collection("FinancialHistory").deleteOne({ _id: ObjectId(id) })
  res.json(data)
})
export default financialHistoryRoute;


