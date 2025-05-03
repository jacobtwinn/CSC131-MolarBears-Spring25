import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config({ path: "../.env" });
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.set("strictQuery", false); // to avoid deprecation warning

export const connectDB = async () => {
    try {
        const conn = await (process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // process code 1 code means exit with failure, 0 means success
    }
};

 const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let database;

export const connectToServer = () => {
    database = client.db("mongodbVSCodePlaygroundDB");
};

export const getDb = () => {
    return database;
};

