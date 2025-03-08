
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import { AuthProvider } from "./context/AuthContext"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

