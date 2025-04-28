import express from "express";
import { getDb, connectToServer } from "../config/db.js";
import { ObjectId } from 'mongodb';

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

export default VisitHistoryRoutes;