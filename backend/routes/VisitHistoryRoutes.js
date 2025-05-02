import express from "express";
import { getDb, connectToServer } from "../config/db.js";
import { ObjectId } from 'mongodb';
import { PDFDocument, rgb } from "pdf-lib";

let VisitHistoryRoutes = express.Router();

VisitHistoryRoutes.get('/VisitHistory', async (req, res) => {
    await connectToServer();
    const db = getDb();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        // Get the total number of documents
        const totalDocs = await db.collection("VisitHistory").countDocuments();

        // Fetch paginated data
        const visits = await db.collection("VisitHistory")
            .find({})
            .skip(skip)
            .limit(limit)
            .toArray();

        const hasNextPage = page * limit < totalDocs;

        res.json({
            visits,
            currentPage: page,
            hasNextPage,
        });

    } catch (err) {
        console.error("Failed to fetch visit history:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Retrieve One
VisitHistoryRoutes.route("/VisitHistory/:id").get(async (req, res) => {
    let db = getDb();
    let id = req.params.id;
    let data = await db.collection("VisitHistory").findOne({ _id: ObjectId(id) });
    if (data) {
        res.json(data);
    } else {
        throw new Error("No data found");
    }
})

// Create One
VisitHistoryRoutes.route("/VisitHistory").post(async (req, res) => {
    let db = getDb() // Get the database instance
    let mongoObject = {
        date: req.body.date,
        patient: req.body.patient,
        dentist: req.body.dentist,
        service: req.body.service
    }
    let data = await db.collection("VisitHistory").insertOne(mongoObject)
    res.json(data)
})

// Update One
VisitHistoryRoutes.route("/VisitHistory/:id").put(async (req, res) => {
    let db = getDb() // Get the database instance
    let mongoObject = {
        $set: {
            date: req.body.date,
            patient: req.body.patient,
            dentist: req.body.dentist,
            service: req.body.service
        }
    }
    let data = await db.collection("VisitHistory").updateOne({_id: new ObjectId(req.params.id)}, mongoObject)
    res.json(data)
})

// Delete One
VisitHistoryRoutes.route("/VisitHistory/:id").delete(async (req, res) => {
    let db = getDb() // Get the database instance
    let data = await db.collection("VisitHistory").deleteOne({_id: new ObjectId(req.params.id)})
    res.json(data)
})

VisitHistoryRoutes.get('/VisitHistory/:id/download', async (req, res) => {
    await connectToServer();
    const db = getDb();
    const id = req.params.id;

    try {
        console.log("Visit ID:", id);

        // Fetch the specific visit by ID
        const visit = await db.collection("VisitHistory").findOne({ _id: new ObjectId(id) });

        if (!visit) {
            console.error("Visit not found");
            return res.status(404).json({ message: "Visit not found" });
        }

        console.log("Visit Data:", visit);

        // Create a new PDF document
        console.log("Creating PDF document...");
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);

        // Add content to the PDF
        console.log("Adding content to PDF...");
        page.drawText(`Visit Details`, { x: 50, y: 350, size: 20, color: rgb(0, 0, 0) });
        page.drawText(`Date: ${visit.date}`, { x: 50, y: 320, size: 14 });
        page.drawText(`Patient: ${visit.patient}`, { x: 50, y: 300, size: 14 });
        page.drawText(`Dentist: ${visit.dentist}`, { x: 50, y: 280, size: 14 });
        page.drawText(`Service: ${visit.service}`, { x: 50, y: 260, size: 14 });

        // Serialize the PDF to bytes
        console.log("Saving PDF...");
        const pdfBytes = await pdfDoc.save();
        console.log("PDF Bytes Length:", pdfBytes.length);

        // Set the response headers to serve the PDF
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="visit_${id}.pdf"`);

        // Send the PDF bytes
        res.send(Buffer.from(pdfBytes)); // Use Buffer to ensure raw binary data is sent
        console.log("PDF generated successfully");
    } catch (err) {
        console.error("Error generating PDF:", err);
        res.status(500).json({ error: "Failed to generate PDF" });
    }
});

export default VisitHistoryRoutes;