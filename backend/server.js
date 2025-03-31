import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { connectDB } from "./config/db.js";
const app = express();
        app.get("/products",(req, res) => { });


console.log(process.env.MONGO_URI);

app.listen(5001, () => {
    console.log("Server started at http://localhost:5001");
    connectDB();
});