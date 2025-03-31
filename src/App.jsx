import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import FinancialHistoryPage from "./pages/FinancialHist";
import UserInfo from "./pages/UserInfo";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setFinancialData] = useState()

  useEffect(() => {
    async function fetchFinancialData() {
      const response = await axios.get("http://localhost:5000/FinancialHistory", {
        withCredentials: true
      });
      if (response.status === 200){
        try {
          setFinancialData(response.data);
        } catch (error) {
          console.error("Error setting financial data:", error);
          setFinancialData(null);
        }
      }
    }
    fetchFinancialData();
  }, []);

  return (
    <>
    <title>DCMS Homepage</title>
    {JSON.stringify(data)}
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<FinancialHistoryPage />} /> {/* Financial history page */}
        <Route path="/user-info" element={<UserInfo />} /> {/* User info page */}
        <Route path="/about" element={<UserInfo/>} /> {/* About page */}
      </Routes>
    </>
  );
}

export default App;