// App.jsx
import React, { useEffect } from "react";
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
import EmploymentStatus from "./pages/EmploymentStatus";
import Reviews from "./pages/Reviews";
import Footer from "./components/ui/Footer";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import UserInfo from "./pages/UserInfo";
import AdminInfo from "./pages/AdminInfo";
import EmployeeInfo from "./pages/EmployeeInfo";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DentalAppointments from "./pages/Appointment";
import FAQ from "./pages/FAQ";
import AppointmentGuidelines from "./pages/AppointmentGuidelines";
import InsurancePaymentPlans from "./pages/InsurancePaymentPlans";
import { isTokenValid } from "./utils/authUtils";
import { useAuth } from "./context/AuthContext";
import AdminPayroll from "./pages/AdminPayroll";


function App() {
  const { isLoggedIn, setIsLoggedIn, userInfo } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Determine which dashboard or info page to show
  const getDashboard = () => {
    switch (userInfo?.role) {
      case "admin":
        return <AdminDashboard />;
      case "employee":
        return <EmployeeDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  const getUserInfoPage = () => {
    switch (userInfo?.role) {
      case "admin":
        return <AdminInfo />;
      case "employee":
        return <EmployeeInfo />;
      default:
        return <UserInfo />;
    }
  };

  return (
    <>
      {isLoggedIn ? <LoggedInNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/visit-history" element={<VisitsPage />} />
        <Route path="/financial-history" element={<FinancialHist />} />
        <Route path="/employment-status" element={<EmploymentStatus />} />
        <Route path="/appointments" element={<DentalAppointments />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/appt-guidelines" element={<AppointmentGuidelines />} />
        <Route path="/payment-info" element={<InsurancePaymentPlans />} />
        <Route path= "/admin-payroll" element={<AdminPayroll />} />

        {/* Role-Based Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              {getDashboard()}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-info"
          element={
            <ProtectedRoute>
              {getUserInfoPage()}
            </ProtectedRoute>
          }
        />

        {/* Password reset */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;