import express from "express";
import { getDb, connectToServer } from "../config/db.js";
import { ObjectId } from 'mongodb';


let financialHistoryRoute = express.Router();

financialHistoryRoute.get('/FinancialHistory', async (req, res) => {
  await connectToServer();
  let db = getDb();
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // Items per page
  const skip = (page - 1) * limit;

  let transactions = await db.collection("FinancialHistory")
    .find({})
    .skip(skip)
    .limit(limit)
    .toArray();

  if (transactions.length > 0) {
    const totalBalance = transactions
      .filter((item) => item.status.toLowerCase() === 'pending')
      .reduce((sum, item) => sum + item.amount, 0);

    res.json({
      transactions,
      totalBalance,
      currentPage: page,
    });
  } else {
    res.status(404).json({ message: "No data found" });
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


