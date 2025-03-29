import express from "express";
import dotenv from "dotenv";
import path from "path"; // Add this import
dotenv.config();
import { connectDB } from "./config/db.js"; // make sure it is db.js and not just db
connectDB();
const __dirname = path.resolve(); // Define __dirname for ES module compatibility
const app = express();
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/products",(req, res) => { });

app.listen(5000, () => {
console.log("Server started at http://localhost:5000");
});