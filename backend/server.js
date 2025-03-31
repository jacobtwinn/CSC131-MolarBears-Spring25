import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import financial from "./routes/financialHistoryRoute.js";
import { connectToServer } from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors( {
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(financial);
app.get("/", (req, res) => {
  res.send("Backend is Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToServer();
});