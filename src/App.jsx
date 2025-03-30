import { Routes, Route, Link, Router } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home"; // Import the new Home component
import FinancialHistoryPage from "./pages/FinancialHist";
import UserInfo from "./pages/UserInfo"; // Import the new UserInfo component

function App() {
  return (
    <>
    <title>DCMS Homepage</title>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<FinancialHistoryPage />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/about" element={<UserInfo/>} />
      </Routes>
    </>
  );
}

export default App;