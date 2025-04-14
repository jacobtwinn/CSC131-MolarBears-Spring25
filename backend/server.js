import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import detect from "detect-port"; // Import detect-port
import VisitHistoryRoutes from './routes/VisitHistoryRoutes.js';

dotenv.config({ path: "../.env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", VisitHistoryRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Detect an available port
const DEFAULT_PORT = process.env.PORT || 5001;
detect(DEFAULT_PORT).then((availablePort) => {
  app.listen(availablePort, () => {
    console.log(`Server running on http://localhost:${availablePort}`);
  });
}).catch((err) => {
  console.error("Error detecting port:", err);
});