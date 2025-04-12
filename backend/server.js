import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import detect from "detect-port"; // Import detect-port
import sendPasswordResetEmail from "./emailService.js";
import User from "./models/User.js";
import crypto from "crypto";

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

app.post("/api/auth/reset-password", async (req, res) => {
  const { email } = req.body;
  console.log("Reset password request received for email:", email);

  if (!email) {
    console.log("No email provided.");
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("Generated reset token:", resetToken);

    // Save the token and expiration time to the user's record
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();
    console.log("User saved successfully with reset token.");

    // Generate the reset link
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
    console.log("Generated reset link:", resetLink);

    console.log("Calling sendPasswordResetEmail with email:", email, "and resetLink:", resetLink);
    // Send the email
    const result = await sendPasswordResetEmail(email, resetLink);
    console.log("Email send result:", result);

    if (result.success) {
      res.status(200).json({ message: "Password reset email sent successfully." });
    } else {
      console.log("Failed to send email.");
      res.status(500).json({ message: "Failed to send password reset email." });
    }
  } catch (error) {
    console.error("Error handling reset password:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

app.post("/api/auth/reset-password-confirm", async (req, res) => {
  const { token, newPassword } = req.body;
  console.log("Token received from frontend:", token);

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required." });
  }

  try {
    // Find the user with the token and ensure the token is not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token is not expired
    });
    console.log("User found with token:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Hash the new password
    user.password = await bcrypt.hash(newPassword, 10);

    // Clear the reset token and expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log("Password reset successfully for user:", user.email);
    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
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