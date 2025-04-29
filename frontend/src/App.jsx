// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import LoggedInNavbar from "./components/ui/LoggedInNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VisitsPage from "./pages/VisitHist";
import FinancialHist from "./pages/FinancialHist";
import Footer from "./components/ui/Footer";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserInfo from "./pages/UserInfo";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { isTokenValid } from "./utils/authUtils";
import { useAuth } from "./context/AuthContext";
import DentalAppointments from "./pages/Appointment";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import AppointmentGuidelines from "./pages/AppointmentGuidelines";
import InsurancePaymentPlans from "./pages/InsurancePaymentPlans";


function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? <LoggedInNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/visit-history" element={<VisitsPage />} />
        <Route path="/financial-history" element={<FinancialHist />} />
        <Route path="/appointments" element={<DentalAppointments />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/appt-guidelines" element={<AppointmentGuidelines />} />
        <Route path="/payment-info" element={<InsurancePaymentPlans />} />


        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
