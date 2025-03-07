import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AppointmentBooking from "./pages/AppointmentBooking"; 


function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Router>
      <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-1 overflow-y-auto bg-neutral-lightest dark:bg-dark-dark p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/appointments" element={<AppointmentBooking darkMode={darkMode} />} />


            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App