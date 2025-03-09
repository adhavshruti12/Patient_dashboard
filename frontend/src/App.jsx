import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
<<<<<<< HEAD
import AppointmentBooking from "./pages/AppointmentBooking"; 
=======
import MedicalHistory from './pages/MedicalHistory' // Ensure correct import
>>>>>>> 752d704 (Added MedicalHistory pages and updated Dashboard)

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
<<<<<<< HEAD
              <Route path="/" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/appointments" element={<AppointmentBooking darkMode={darkMode} />} />
=======
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/medical-history" element={<MedicalHistory />} />
>>>>>>> 752d704 (Added MedicalHistory pages and updated Dashboard)
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
