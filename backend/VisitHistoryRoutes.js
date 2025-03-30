const express = require("express")
const database = require("./db")
const ObjectId = require("mongodb").ObjectId

let VisitHistoryRoutes = express.Router()

// Retrieve All
//http://localhost:3000/posts
VisitHistoryRoutes.route("/VisitHistory").get(async (request, response) => {
    let db = database.getDb() // Get the database instance
    let data = await db.collection("VisitHistory").find({}).toArray()
    if (data.length > 0) {
        response.json(data)
    }
    else {
        throw new Error("Data was not found")
    }
})

// Retrieve One
VisitHistoryRoutes.route("/VisitHistory/:id").get(async (request, response) => {
    let db = database.getDb() // Get the database instance
    let data = await db.collection("VisitHistory").findOne({_id: new ObjectId(request.params.id)})
    if (Object.keys(data).length > 0) {
        response.json(data)
    }
    else {
        throw new Error("Data was not found")
    }
})

// Create One
VisitHistoryRoutes.route("/VisitHistory").post(async (request, response) => {
    let db = database.getDb() // Get the database instance
    let mongoObject = {
        date: request.body.date,
        patient: request.body.patient,
        dentist: request.body.dentist,
        service: request.body.service
    }
    let data = await db.collection("VisitHistory").insertOne(mongoObject)
    response.json(data)
})

// Update One
VisitHistoryRoutes.route("/VisitHistory/:id").put(async (request, response) => {
    let db = database.getDb() // Get the database instance
    let mongoObject = {
        $set: {
            date: request.body.date,
            patient: request.body.patient,
            dentist: request.body.dentist,
            service: request.body.service
        }
    }
    let data = await db.collection("VisitHistory").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})

// Delete One
VisitHistoryRoutes.route("/VisitHistory/:id").delete(async (request, response) => {
    let db = database.getDb() // Get the database instance
    let data = await db.collection("VisitHistory").deleteOne({_id: new ObjectId(request.params.id)})
    response.json(data)
})

module.exports = VisitHistoryRoutes