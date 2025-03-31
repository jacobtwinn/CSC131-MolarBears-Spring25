import "./App.css"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
// import { getVisits, getVisit, createVisit, updateVisit, deleteVisit } from "./api"
// import { PatientVisitHistory } from "./pages/PatientVisitHistory"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Navbar } from "./ui/Navbar"
import { Layout } from "./ui/Layout"

function App() {

  /*const [visits, setVisits] = useState()

  useEffect(() => {
    async function loadAllVisits() {
      let data = await getVisits()
      if (data) {
        setVisits(data)
      }
    }

    loadAllVisits()
  }, [])*/

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route element={<Layout/>}>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
