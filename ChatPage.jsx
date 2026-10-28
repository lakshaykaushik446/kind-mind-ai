import React, { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../services/api.js'
import './ChatPage.css'

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content: "Hi there 💙 I'm Kind Mind AI, your wellness companion. I'm here to listen and support you — no judgment, just care. How are you feeling today?",
  },
]

const CRISIS_KEYWORDS = ['suicide', 'kill myself', 'self-harm', 'self harm', 'hurt myself', 'want to die', 'end my life']

function isCrisis(text) {
  const lower = text.toLowerCase()
  return CRISIS_KEYWORDS.some(k => lower.includes(k))
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`message-row ${isUser ? 'message-row--user' : 'message-row--assistant'}`}>
      {!isUser && <div className="message-avatar">🌿</div>}
      <div className={`message-bubble ${isUser ? 'bubble--user' : 'bubble--assistant'}`}>
        {msg.content.split('\n').map((line, i) => {
          // Bold markdown **text**
          const parts = line.split(/\*\*(.*?)\*\*/g)
          return (
            <p key={i} style={{ margin: i > 0 ? '6px 0 0' : 0 }}>
              {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
            </p>
          )
        })}
        {msg.timestamp && (
          <span className="message-time">{msg.timestamp}</span>
        )}
      </div>
      {isUser && <div className="message-avatar message-avatar--user">👤</div>}
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="message-row message-row--assistant">
      <div className="message-avatar">🌿</div>
      <div className="message-bubble bubble--assistant bubble--typing">
        <span className="dot" /><span className="dot" /><span className="dot" />
      </div>
    </div>
  )
}

function CrisisBanner() {
  return (
    <div className="crisis-banner">
      <strong>🆘 If you're in crisis, please reach out now:</strong>
      <ul>
        <li>Call or text <strong>988</strong> (Suicide & Crisis Lifeline, US)</li>
        <li>Text HOME to <strong>741741</strong> (Crisis Text Line)</li>
        <li>Call <strong>911</strong> or your local emergency number</li>
      </ul>
    </div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showCrisis, setShowCrisis] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    if (isCrisis(text)) setShowCrisis(true)

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg = { role: 'user', content: text, timestamp }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const apiMessages = updated.map(m => ({ role: m.role, content: m.content }))
      const reply = await sendMessage(apiMessages)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, I had trouble connecting. Please check your connection and try again." },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES)
    setShowCrisis(false)
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-header-info">
          <span className="chat-header-avatar">🌿</span>
          <div>
            <div className="chat-header-name">Kind Mind AI</div>
            <div className="chat-header-status">
              <span className="status-dot" /> AI Wellness Companion
            </div>
          </div>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={handleClear}>
          🗑 Clear Chat
        </button>
      </div>

      {showCrisis && <CrisisBanner />}

      <div className="chat-messages">
        {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          ref={inputRef}
          className="chat-input"
          placeholder="Share what's on your mind…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          maxLength={2000}
          disabled={loading}
        />
        <button
          className="chat-send-btn"
          onClick={handleSend}
          disabled={!input.trim() || loading}
          aria-label="Send message"
        >
          {loading ? '⏳' : '➤'}
        </button>
      </div>
      <div className="chat-input-hint">Press Enter to send · Shift+Enter for new line</div>
    </div>
  )
}
