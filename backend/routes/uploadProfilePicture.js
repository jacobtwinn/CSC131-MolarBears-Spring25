// uploadProfilePicture.js
import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const router = express.Router();

// Get current directory correctly for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//  File storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const fullUploadPath = path.join(__dirname, "../uploads"); 
      cb(null, fullUploadPath);
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.replace(/\s+/g, "-"); // Replace spaces with dashes
        const uniqueName = Date.now() + "-" + originalName;
        cb(null, uniqueName);
      }
  });

const upload = multer({ storage });

router.put("/upload", upload.single("profilePicture"), async (req, res) => {
  
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Missing token" });
  
      const { username } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      const imageUrl = `http://localhost:5001/uploads/${req.file.filename}`;
      user.profilePicture = imageUrl;
      await user.save();
  
  
      res.json({ message: "Profile picture updated successfully", imageUrl });
    } catch (err) {
      console.error("Upload failed:", err);
      res.status(500).json({ message: "Upload failed" });
    }
  });
  
  
  export default router;