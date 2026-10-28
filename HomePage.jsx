import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const features = [
  { icon: '💬', title: 'AI Chat Companion', desc: 'Talk through your feelings with an empathetic AI that listens without judgment.', to: '/chat' },
  { icon: '😊', title: 'Daily Mood Check-In', desc: 'Track how you feel each day and see patterns in your emotional wellbeing.', to: '/mood' },
  { icon: '📓', title: 'Private Journal', desc: 'Write freely in a private space. Your thoughts, your words, your safe place.', to: '/journal' },
  { icon: '🌬️', title: 'Breathing & Grounding', desc: 'Guided breathing and grounding exercises to calm your mind in minutes.', to: '/exercises' },
  { icon: '✨', title: 'Self-Care Ideas', desc: 'Practical, science-backed self-care suggestions tailored to your mood.', to: '/self-care' },
  { icon: '📊', title: 'Mood History', desc: 'Visualize your emotional journey over time with a simple, clear chart.', to: '/mood' },
]

export default function HomePage() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-hero-badge">🌿 Your Wellness Companion</div>
          <h1 className="home-hero-title">
            You deserve to feel <span className="home-hero-highlight">better</span>.
          </h1>
          <p className="home-hero-subtitle">
            Kind Mind AI is a safe, private space to explore your emotions, learn coping strategies,
            and take small steps toward a healthier, more peaceful mind.
          </p>
          <div className="home-hero-actions">
            <Link to="/chat" className="btn btn-primary btn-lg">
              💬 Start Chatting
            </Link>
            <Link to="/mood" className="btn btn-secondary btn-lg">
              😊 Check In Today
            </Link>
          </div>
          <p className="home-hero-disclaimer">
            Not a substitute for professional mental health care. &nbsp;
            <a href="#disclaimer">Learn more ↓</a>
          </p>
        </div>
        <div className="home-hero-visual" aria-hidden="true">
          <div className="home-hero-orb orb-1">🧘</div>
          <div className="home-hero-orb orb-2">💙</div>
          <div className="home-hero-orb orb-3">🌱</div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="home-features">
        <div className="page-container">
          <h2 className="home-section-title">Everything you need to feel supported</h2>
          <div className="home-features-grid">
            {features.map(f => (
              <Link to={f.to} key={f.title} className="home-feature-card">
                <div className="home-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Banner */}
      <section className="home-crisis page-container">
        <div className="home-crisis-inner">
          <div className="home-crisis-icon">🆘</div>
          <div>
            <strong>In crisis or need immediate help?</strong>
            <p>
              Call or text <strong>988</strong> (Suicide & Crisis Lifeline, US) · Text HOME to <strong>741741</strong> (Crisis Text Line) · Call <strong>911</strong> for emergencies.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section id="disclaimer" className="home-disclaimer-section page-container">
        <div className="card">
          <h3>⚠️ Important Disclaimer</h3>
          <p>
            Kind Mind AI is an AI wellness companion designed to provide <strong>general emotional support and coping resources only</strong>.
            It is <strong>not a licensed therapist</strong>, cannot diagnose any mental health condition, and is not a substitute for
            professional medical or psychological care. If you are experiencing a mental health emergency, please contact emergency
            services or a crisis helpline immediately.
          </p>
        </div>
      </section>
    </div>
  )
}
