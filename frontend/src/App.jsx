import { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import './App.css'
import FinancialPage from './pages/financialPage'
import AccountDetails from './pages/UserInfo'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <title>DCMS Homepage</title>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>DCMS homepage</h1>
              <div>
                <Link to="/financial">Financial Homepage</Link>
                <Link to="/userinfo">Account Information</Link>
              </div>
            </>
          }
        />
        <Route path="/financial" element={<FinancialPage />} />
        <Route path="/userinfo" element={<AccountDetails />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
