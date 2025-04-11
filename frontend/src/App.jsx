import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FinancialPage from "./pages/FinancialHist";
import UserInfo from "./pages/UserInfo";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Other routes can be added here */}
        <Route path="/financial-history" element={<FinancialPage />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
