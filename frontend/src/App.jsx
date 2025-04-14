import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VisitsPage from "./pages/VisitHist";
import FinancialHist from "./pages/FinancialHist";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Other routes can be added here */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/visit-history" element={<VisitsPage />} />
        <Route path="/financial-history" element={<FinancialHist />} />
      </Routes>
    </>
  );
}

export default App;
