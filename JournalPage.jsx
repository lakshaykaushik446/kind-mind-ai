import React, { useState, useEffect } from 'react'
import { getJournalEntries, createJournalEntry, deleteJournalEntry, clearJournalEntries } from '../services/api.js'
import './JournalPage.css'

export default function JournalPage() {
  const [entries, setEntries] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getJournalEntries().then(data => setEntries(data.entries || []))
  }, [])

  const handleSave = async () => {
    if (!content.trim()) return
    setLoading(true)
    try {
      await createJournalEntry({ content })
      const data = await getJournalEntries()
      setEntries(data.entries || [])
      setContent('')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      alert('Could not save entry. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return
    await deleteJournalEntry(id)
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const handleClearAll = async () => {
    if (!confirm('Delete ALL journal entries? This cannot be undone.')) return
    await clearJournalEntries()
    setEntries([])
  }

  return (
    <div className="page-container">
      <h1 className="page-title">📓 Private Journal</h1>
      <p className="page-subtitle">
        This is your safe, private space. Write freely — your thoughts stay here.
      </p>

      {/* New Entry */}
      <div className="card journal-write-card">
        <h2 className="mood-section-title">Write a new entry</h2>
        <textarea
          className="journal-textarea"
          placeholder="What's on your mind today? How did you feel? What happened? …"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={6}
          maxLength={5000}
        />
        <div className="journal-write-footer">
          <span className="journal-char-count">{content.length} / 5000</span>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!content.trim() || loading}
          >
            {loading ? '⏳ Saving…' : saved ? '✅ Saved!' : '💾 Save Entry'}
          </button>
        </div>
      </div>

      {/* Entry List */}
      {entries.length > 0 && (
        <div className="journal-entries">
          <div className="journal-entries-header">
            <h2 className="mood-section-title" style={{ margin: 0 }}>
              📚 Previous Entries ({entries.length})
            </h2>
            <button className="btn btn-danger btn-sm" onClick={handleClearAll}>
              🗑 Clear All
            </button>
          </div>
          {[...entries].reverse().map(entry => (
            <div key={entry.id} className="journal-entry-card card">
              <div className="journal-entry-header">
                <span className="journal-entry-date">
                  {new Date(entry.timestamp).toLocaleString([], {
                    weekday: 'short', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(entry.id)}
                >
                  🗑
                </button>
              </div>
              <p className="journal-entry-content">{entry.content}</p>
            </div>
          ))}
        </div>
      )}

      {entries.length === 0 && (
        <div className="journal-empty">
          <div className="journal-empty-icon">📓</div>
          <p>No entries yet. Start writing your first entry above.</p>
        </div>
      )}
    </div>
  )
}
