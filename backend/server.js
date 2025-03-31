import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { connectDB } from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.js";
const app = express();
        app.get("/products",(req, res) => { });

        app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes);

console.log(process.env.MONGO_URI);

app.listen(5001, () => {
    console.log("Server started at http://localhost:5001");
    connectDB();
});