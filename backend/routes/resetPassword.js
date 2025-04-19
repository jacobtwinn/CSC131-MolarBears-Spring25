import express from "express";
import sendPasswordResetEmail from "../emailService.js";
import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/password", async (req, res) => {
    const { email } = req.body;
    console.log("Reset password request received for email:", email);
  
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
  
  
      const resetToken = crypto.randomBytes(32).toString("hex");
  
      const encodedToken = encodeURI(resetToken);
  
      // Save the token exactly as it is generated
      user.resetPasswordToken = encodedToken;
      user.resetPasswordExpires = Date.now() + 3600000;
      const savedUser = await user.save();
  
      console.log("Reset token saved to user:", {
        email: savedUser.email,
        resetPasswordToken: savedUser.resetPasswordToken,
        resetPasswordExpires: savedUser.resetPasswordExpires,
      });
  
      const resetLink = "http://localhost:5173/reset-password?token=" + encodedToken;
  
      const result = await sendPasswordResetEmail(email, resetLink);
  
      if (result.success) {
        res.status(200).json({ message: "Password reset email sent successfully." });
      } else {
        res.status(500).json({ message: "Failed to send password reset email." });
      }
    } catch (error) {
      console.error("Error handling reset password:", error);
      res.status(500).json({ message: "An error occurred. Please try again." });
    }
  });
  
  router.post("/password-confirm", async (req, res) => {
    let { token, newPassword } = req.body;
    console.log("Token received from frontend:", token);
  
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required." });
    }
  
    try {
     
      console.log("Decoded token:", token); // Log the decoded token
  
      const user = await User.findOne({
        resetPasswordToken: token
      });
      
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }
  
      console.log("User found with token:", user.email);
      if (Date.now() > user.resetPasswordExpires) {
        return res.status(400).json({ message: "Token has expired." });
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "An error occurred. Please try again." });
    }
  });

  export default router;
