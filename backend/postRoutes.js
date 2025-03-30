const express = require("express")
const database = require("./db")
const ObjectId = require("mongodb").ObjectId

let postRoutes = express.Router()

// Retrieve All
//http://localhost:3000/posts
postRoutes.route("/posts/:id").get(async (request, response) => {
    let db = database.getDb() // Get the database instance
    let data = await db.collection("posts").find({}).toArray()
    if (data.length > 0) {
        response.json(data)
    }
    else {
        throw new Error("Data was not found")
    }
})

// Retrieve One
postRoutes.route("/posts/:id").get(async (request, response) => {
    let db = database.getDb() // Get the database instance
    let data = await db.collection("posts").findOne({_id: new ObjectId(request.params.id)})
    if (Object.keys(data).length > 0) {
        response.json(data)
    }
    else {
        throw new Error("Data was not found")
    }
})

// Create One
postRoutes.route("/posts").get(async (request, response) => {
    let db = database.getDb() // Get the database instance
    let mongoObject = {
        
    }
    let data = await db.collection("posts").findOne({_id: new ObjectId(request.params.id)})
    if (Object.keys(data).length > 0) {
        response.json(data)
    }
    else {
        throw new Error("Data was not found")
    }
})

// Update One

// Update One