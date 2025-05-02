// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import resetRoutes from "./routes/resetPassword.js";
import Appointment from "./routes/appointments.js";
import detect from "detect-port";
import VisitHistoryRoutes from './routes/VisitHistoryRoutes.js';
import ReviewRoutes from './routes/ReviewRoutes.js';
import financialHistoryRoute from './routes/financialHistoryRoute.js';
import uploadProfilePictureRouter from './routes/uploadProfilePicture.js';
import path from "path";
import { fileURLToPath } from "url";
import payrollRoutes from './routes/payrollRoutes.js'; // Import the payroll routes


dotenv.config({ path: "../.env" });

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); 

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", VisitHistoryRoutes);
app.use("/api", ReviewRoutes);
app.use("/api", financialHistoryRoute);
app.use("/api/appointments", Appointment);
app.use("/api/reset", resetRoutes);
app.use("/api/profile", uploadProfilePictureRouter); 
app.use("/api/employees", payrollRoutes);


// Homepage
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/test-upload", (req, res) => {
  res.sendFile(path.join(path.resolve(), "uploads/1745955031585-IMG_3623-(1).png"));
});

// Server start
const DEFAULT_PORT = process.env.PORT || 5001;
detect(DEFAULT_PORT)
  .then((availablePort) => {
    app.listen(availablePort, () => {
      console.log(`Server running on http://localhost:${availablePort}`);
    });
  })
  .catch((err) => {
    console.error("Error detecting port:", err);
  });
