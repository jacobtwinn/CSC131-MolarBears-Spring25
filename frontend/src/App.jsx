import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "./ui/Navbar";
import PatientVisitHistory from "./pages/PatientVisitHistory" // Import the new Home component
import "./App.css"

function App() {

  const [data, setData] = useState()

  useEffect(() => {
    async function grabData() {
      const response = await axios.get("http://localhost:3000/VisitHistory")
      console.log(response)
      if (response.status == 200) {
        setData(response.data)
      }
    }

    grabData()
  }, [])

  return (
    <>
      {JSON.stringify(data)}
      {/* The Navbar component will be displayed on all pages */}
      <Navbar />
      <Routes>
        <Route path="/" element={<PatientVisitHistory />} />
      </Routes>
    </>
  )
}

export default App;
