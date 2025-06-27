import "./App.sass"
import { useState } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Info from "./components/Info"
import ServiceList from "./components/ServiceList"
import Footer from "./components/Footer"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <div className="app-container">
        <Header isLoggedIn={isLoggedIn} onLogOut={handleLogOut} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/info" element={<Info />} />
            <Route path="/service" element={<ServiceList />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  )
}

export default App