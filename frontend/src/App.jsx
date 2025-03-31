import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css"; // Import the CSS file

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Other routes can be added here */}
      </Routes>
    </>
  );
}

export default App;