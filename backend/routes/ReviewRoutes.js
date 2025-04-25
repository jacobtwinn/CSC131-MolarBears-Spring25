import express from "express";
import { getDb, connectToServer } from "../config/db.js";
import { ObjectId } from 'mongodb';

let ReviewRoutes = express.Router();

// Retrieve All
ReviewRoutes.get('/Reviews', async (req, res) => {
    await connectToServer();
    const db = getDb();
  
    try {
        const reviews = await db.collection("Reviews").find().toArray();
  
        res.json({
        reviews,
    });
    } catch (err) {
        console.error("Failed to fetch reviews:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Retrieve One
ReviewRoutes.route("/Reviews/:id").get(async (req, res) => {
    let db = getDb();
    let id = req.params.id;
    let data = await db.collection("Reviews").findOne({ _id: ObjectId(id) });
    if (data) {
        res.json(data);
    } else {
        throw new Error("No data found");
    }
})

// Create One
ReviewRoutes.route("/Reviews").post(async (req, res) => {
    let db = getDb() // Get the database instance
    let mongoObject = {
        date: req.body.date,
        reviewer: req.body.reviewer,
        dentist: req.body.dentist,
        rating: req.body.rating,
        review: req.body.review
    }
    let data = await db.collection("Reviews").insertOne(mongoObject)
    res.json(data)
})

// Update One
ReviewRoutes.route("/Reviews/:id").put(async (req, res) => {
    let db = getDb() // Get the database instance
    let mongoObject = {
        $set: {
            date: req.body.date,
            reviewer: req.body.reviewer,
            dentist: req.body.dentist,
            rating: req.body.rating,
            review: req.body.review
        }
    }
    let data = await db.collection("Reviews").updateOne({_id: new ObjectId(req.params.id)}, mongoObject)
    res.json(data)
})

// Delete One
ReviewRoutes.route("/Reviews/:id").delete(async (req, res) => {
    let db = getDb() // Get the database instance
    let data = await db.collection("Reviews").deleteOne({_id: new ObjectId(req.params.id)})
    res.json(data)
})

export default ReviewRoutes;