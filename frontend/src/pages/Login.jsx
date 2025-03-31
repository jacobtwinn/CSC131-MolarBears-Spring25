import React from 'react';
import './Login.css'; // Ensure this import is correct

const Login = () => (
  <div className="login-container"> {/* Ensure this matches the CSS class */}
    <div className="login-box"> {/* Add the missing wrapper for styling */}
      <h2>Login</h2>
      <form>
        {["username", "password"].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input type={field === "password" ? "password" : "text"} id={field} name={field} />
          </div>
        ))}
        <div className="form-group">
          <button type="submit" className="login-button">Login</button>
        </div>
        <div className="form-group">
          <button type="button" className="register-button">Register</button>
        </div>
      </form>
    </div>
  </div>
);

export default Login;