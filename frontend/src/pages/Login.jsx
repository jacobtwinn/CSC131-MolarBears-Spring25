import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import RouterLink
import { Button } from '@chakra-ui/react'; // Ensure Chakra UI is installed
import './Login.css'; // Ensure this import is correct

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError("");
    setSuccess("");

    try {
      // Send login request to the backend
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData,
      );
      const { token } = response.data;

      // Save the token to localStorage
      localStorage.setItem("jwtToken", token);

      setSuccess('Login successful!');
      console.log('JWT Token:', token);

      // Redirect to userDashboard.jsx
      navigate('/userDashboard'); 
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
                onChange={handleChange} // Update state on input change
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
            {/* Register Button */}
            <Button
              as={RouterLink}
              to="/register"
              colorScheme="blue"
              variant="solid"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
