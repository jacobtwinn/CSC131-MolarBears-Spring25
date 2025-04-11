import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Password validation function
  const validatePassword = (password) => {
    // Password regex, requires password form to be 8 characters long with an upper case, lower case, special character and number
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Password validation check
    if (!validatePassword(formData.password)) {
      setError(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        formData,
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
