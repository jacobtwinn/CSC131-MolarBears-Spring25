import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/reset/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset email sent. Check your inbox.");
      } else {
        setError(data.message || "Failed to send reset email.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <div className="form-group button-group">
            <RouterLink to="/login" className="cancel-link">
              <button type="button" className="cancel-button">
                Cancel
              </button>
            </RouterLink>
            <button type="submit" className="reset-button">
              Send Reset Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;