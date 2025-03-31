import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// Mock user data (replace with database logic)
const users = [
  { username: "testuser", password: bcrypt.hashSync("password123", 10) },
];

// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Check password
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

  // Generate JWT
  const token = jwt.sign({ username }, "your_jwt_secret", { expiresIn: "1h" });
  res.json({ token });
});

export default router;