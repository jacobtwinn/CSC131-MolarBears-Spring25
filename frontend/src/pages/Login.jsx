import React, { useState } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import "/src/CSS/Login.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, refreshUserInfo } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData
      );
      const { token } = response.data;

      localStorage.setItem("jwtToken", token);
      setSuccess("Login successful!");
      console.log("JWT Token:", token);
      setIsLoggedIn(true);
      
      // Call refreshUserInfo here instead of reloading:
      refreshUserInfo();

      console.log("Logged in user role:", response.data.role); // optional
      
      navigate("/home"); 
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {["username", "password"].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="form-group">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          <div className="form-group">
            <Button
              as={RouterLink}
              to="/register"
              colorScheme="blue"
              variant="solid"
            >
              Register
            </Button>
          </div>
          <div className="form-group">
            <Button
              as={RouterLink}
              to="/forgot-password"
              colorScheme="teal"
              variant="link"
            >
              Forgot Password?
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
