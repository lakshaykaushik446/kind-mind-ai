import React, { useState } from 'react'
import './Disclaimer.css'

export default function Disclaimer() {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('disclaimer_dismissed') === '1'
  )

  if (dismissed) return null

  const dismiss = () => {
    sessionStorage.setItem('disclaimer_dismissed', '1')
    setDismissed(true)
  }

  return (
    <div className="disclaimer-footer">
      <div className="disclaimer-inner">
        <span className="disclaimer-icon">⚠️</span>
        <p>
          <strong>Kind Mind AI is not a therapist</strong> and cannot diagnose or treat mental health conditions.
          It provides general wellness support only. If you're in crisis, call{' '}
          <a href="tel:988">988</a> or text HOME to <a href="sms:741741">741741</a>.
        </p>
        <button className="disclaimer-dismiss" onClick={dismiss} aria-label="Dismiss disclaimer">✕</button>
      </div>
    </div>
  )
}
