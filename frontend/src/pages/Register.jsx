// Register.jsx
import React, { useState } from "react";
import axios from "axios";
import "/src/CSS/Register.css"; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.username || !formData.password || !formData.confirmPassword) {
        setError("All fields are required.");
        return;
      }
      if (!validatePassword(formData.password)) {
        setError(
          "Password must be at least 8 characters, include an uppercase letter, number, and special character."
        );
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }
    setError("");
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { firstName, lastName, email, gender, dob } = formData;
    if (!firstName || !lastName || !email || !gender || !dob) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/auth/register", formData);
      setSuccess("Verification email sent. Please check your inbox.");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Login credentials */}
          <div className={`step-container ${step === 1 ? "active" : ""}`}>
            {step === 1 && (
              <>
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
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <button type="button" onClick={handleNext}>
                  Next
                </button>
              </>
            )}
          </div>

          {/* Step 2: Personal info */}
          <div className={`step-container ${step === 2 ? "active" : ""}`}>
            {step === 2 && (
              <>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date of Birth:</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div className="button-group">
                  <button type="button" onClick={handleBack}>
                    Back
                  </button>
                  <button type="submit">Register</button>
                </div>
              </>
            )}
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
