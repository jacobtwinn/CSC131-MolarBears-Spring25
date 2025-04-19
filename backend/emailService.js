import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const sendPasswordResetEmail = async (userEmail, resetLink) => {
  try {

    // Verify environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      throw new Error("GMAIL_USER or GMAIL_PASS is not set in the environment variables.");
    }
    console.log("GMAIL_USER:", process.env.GMAIL_USER);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      debug: true, // Enable debugging
      logger: true, // Log information to the console
    });

    // Verify the transporter configuration
    await transporter.verify();
    console.log("Transporter verified successfully.");

    let htmlText = "<p>You requested a password reset. Click the link below to reset your password:</p>";
    htmlText += "<p><a href=" + resetLink + ">" + resetLink + "</a></p>";
    htmlText += "<p>If you did not request this, please ignore this email.</p>";

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER, // Sender address
      to: userEmail, // Recipient's email
      subject: "Password Reset Request",
      html: htmlText, // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error.message || error);
    return { success: false, message: "Failed to send email." };
  }
};

export default sendPasswordResetEmail;