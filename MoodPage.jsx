import React, { useState, useEffect } from 'react'
import { logMood, getMoodHistory, clearMoodHistory } from '../services/api.js'
import MoodChart from '../components/MoodChart.jsx'
import './MoodPage.css'

const EMOTIONS = [
  { emoji: '😄', label: 'Happy', color: '#f6e05e' },
  { emoji: '😌', label: 'Calm', color: '#68d391' },
  { emoji: '😐', label: 'Neutral', color: '#a0aec0' },
  { emoji: '😔', label: 'Sad', color: '#76e4f7' },
  { emoji: '😟', label: 'Anxious', color: '#f6ad55' },
  { emoji: '😠', label: 'Angry', color: '#fc8181' },
  { emoji: '😩', label: 'Exhausted', color: '#b794f4' },
  { emoji: '🤩', label: 'Grateful', color: '#fbb6ce' },
]

export default function MoodPage() {
  const [selected, setSelected] = useState(null)
  const [intensity, setIntensity] = useState(5)
  const [note, setNote] = useState('')
  const [history, setHistory] = useState([])
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMoodHistory().then(data => setHistory(data.entries || []))
  }, [])

  const handleSubmit = async () => {
    if (!selected) return
    setLoading(true)
    try {
      await logMood({ emotion: selected.label, intensity, note })
      const data = await getMoodHistory()
      setHistory(data.entries || [])
      setSaved(true)
      setNote('')
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      alert('Could not save mood. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async () => {
    if (!confirm('Clear all mood history?')) return
    await clearMoodHistory()
    setHistory([])
  }

  return (
    <div className="page-container">
      <h1 className="page-title">😊 Daily Mood Check-In</h1>
      <p className="page-subtitle">How are you feeling right now? Take a moment to check in with yourself.</p>

      {/* Emotion selector */}
      <div className="card mood-card">
        <h2 className="mood-section-title">Select your emotion</h2>
        <div className="emotion-grid">
          {EMOTIONS.map(e => (
            <button
              key={e.label}
              className={`emotion-btn ${selected?.label === e.label ? 'emotion-btn--selected' : ''}`}
              style={selected?.label === e.label ? { borderColor: e.color, background: e.color + '33' } : {}}
              onClick={() => setSelected(e)}
            >
              <span className="emotion-emoji">{e.emoji}</span>
              <span className="emotion-label">{e.label}</span>
            </button>
          ))}
        </div>

        {/* Intensity */}
        <div className="mood-intensity">
          <label>
            Intensity: <strong>{intensity} / 10</strong>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={intensity}
            onChange={e => setIntensity(Number(e.target.value))}
            className="intensity-slider"
          />
          <div className="intensity-labels">
            <span>Very mild</span>
            <span>Very strong</span>
          </div>
        </div>

        {/* Note */}
        <div className="mood-note">
          <label htmlFor="mood-note">Add a note (optional)</label>
          <textarea
            id="mood-note"
            placeholder="What's contributing to this feeling?"
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={2}
            className="mood-textarea"
          />
        </div>

        <div className="mood-actions">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!selected || loading}
          >
            {loading ? '⏳ Saving…' : saved ? '✅ Saved!' : '💾 Log Mood'}
          </button>
        </div>
      </div>

      {/* History Chart */}
      {history.length > 0 && (
        <div className="card mood-history-card">
          <div className="mood-history-header">
            <h2 className="mood-section-title">📊 Mood History</h2>
            <button className="btn btn-danger btn-sm" onClick={handleClear}>🗑 Clear</button>
          </div>
          <MoodChart entries={history} />
          <div className="mood-history-list">
            {[...history].reverse().slice(0, 10).map((entry, i) => (
              <div key={i} className="mood-history-item">
                <span className="mood-history-emotion">
                  {EMOTIONS.find(e => e.label === entry.emotion)?.emoji || '😐'} {entry.emotion}
                </span>
                <span className="mood-history-intensity">Intensity: {entry.intensity}</span>
                {entry.note && <span className="mood-history-note">"{entry.note}"</span>}
                <span className="mood-history-time">{new Date(entry.timestamp).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
