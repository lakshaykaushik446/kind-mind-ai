import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import MoodPage from './pages/MoodPage.jsx'
import JournalPage from './pages/JournalPage.jsx'
import ExercisesPage from './pages/ExercisesPage.jsx'
import SelfCarePage from './pages/SelfCarePage.jsx'
import Disclaimer from './components/Disclaimer.jsx'
import './App.css'

function NavBar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: '🏠 Home' },
    { to: '/chat', label: '💬 Chat' },
    { to: '/mood', label: '😊 Mood' },
    { to: '/journal', label: '📓 Journal' },
    { to: '/exercises', label: '🌬️ Exercises' },
    { to: '/self-care', label: '✨ Self-Care' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <span className="navbar-logo">🌿</span>
          <span>Kind Mind AI</span>
        </NavLink>
        <button className="navbar-toggle" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? '✕' : '☰'}
        </button>
        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/mood" element={<MoodPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/self-care" element={<SelfCarePage />} />
        </Routes>
      </main>
      <Disclaimer />
    </BrowserRouter>
  )
}
