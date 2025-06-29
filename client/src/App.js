import "./App.sass"
import { useState, useEffect } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Info from "./components/Info"
import ServiceList from "./components/ServiceList"
import Footer from "./components/Footer"

function App() {

  const baseURL = process.env.REACT_APP_API_URL

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [services, setServices] = useState([])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${baseURL}/api/services`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.error("Ошибка при загрузке услуг:", error)
      }
    }

    fetchServices()
  }, []) // Пустой массив зависимостей означает, что эффект выполнится только при монтировании

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
            <Route path="/service" element={<ServiceList services={services} />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  )
}

export default App