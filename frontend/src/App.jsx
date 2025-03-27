import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import './App.css'
import FinancialPage from './pages/financialPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>DCMS homepage</h1>
              <div>
                <Link to="/financial">Financial Homepage Here</Link>
              </div>
            </>
          }
        />
        <Route path="/financial" element={<FinancialPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
