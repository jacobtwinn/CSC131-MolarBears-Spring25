import { Routes, Route } from "react-router-dom";
import Navbar from "./ui/Navbar";
import PatientVisitHistory from "./pages/PatientVisitHistory"; // Import the new Home component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PatientVisitHistory />} />
        {/* Other routes can be added here */}
      </Routes>
    </>
  );
}

export default App;
