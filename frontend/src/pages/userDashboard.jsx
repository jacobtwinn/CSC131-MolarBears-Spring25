import React from "react";

const UserDashboard = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Your Dashboard</h1>
      <p>This is your user dashboard. Here you can manage your account and view your details.</p>
      <div style={{ marginTop: "20px" }}>
        <button style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Manage Account
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;