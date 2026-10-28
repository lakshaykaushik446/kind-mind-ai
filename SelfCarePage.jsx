import React, { useState } from 'react'
import './SelfCarePage.css'

const CATEGORIES = [
  {
    id: 'physical',
    icon: '🏃',
    title: 'Physical',
    color: '#68d391',
    tips: [
      { title: 'Take a 10-minute walk', desc: 'Even a short walk outdoors can reduce cortisol and boost mood.' },
      { title: 'Stretch for 5 minutes', desc: 'Release physical tension stored in your body. Try neck, shoulder, and back stretches.' },
      { title: 'Drink a full glass of water', desc: 'Dehydration affects your mood and cognitive function more than you think.' },
      { title: 'Get 7–9 hours of sleep', desc: 'Sleep is the single most powerful recovery tool for mental wellbeing.' },
      { title: 'Try a 5-minute dance break', desc: 'Movement + music is a scientifically proven mood lifter.' },
    ],
  },
  {
    id: 'mental',
    icon: '🧠',
    title: 'Mental',
    color: '#6c63ff',
    tips: [
      { title: 'Write 3 things you\'re grateful for', desc: 'Gratitude journaling rewires the brain toward positive patterns over time.' },
      { title: 'Limit news/social media for 1 hour', desc: 'Digital detox periods significantly reduce anxiety and comparison stress.' },
      { title: 'Read a book or article for pleasure', desc: 'Reading reduces stress by up to 68% within 6 minutes (University of Sussex study).' },
      { title: 'Do a creative activity', desc: 'Drawing, coloring, or doodling activates the same relaxation pathways as meditation.' },
      { title: 'Celebrate a small win today', desc: 'Acknowledging progress, no matter how small, builds motivation and self-worth.' },
    ],
  },
  {
    id: 'social',
    icon: '❤️',
    title: 'Social',
    color: '#fc8181',
    tips: [
      { title: 'Text or call someone you care about', desc: 'Social connection is one of the strongest predictors of long-term wellbeing.' },
      { title: 'Do a kind act for someone', desc: 'Acts of kindness release oxytocin and boost your own mood as much as the recipient\'s.' },
      { title: 'Set one gentle boundary today', desc: 'Saying "no" to something that drains you is a powerful act of self-care.' },
      { title: 'Ask for help with something', desc: 'Reaching out is a strength, not a weakness. Let someone support you today.' },
      { title: 'Spend time with a pet', desc: 'Interacting with animals reduces cortisol and increases serotonin and dopamine.' },
    ],
  },
  {
    id: 'spiritual',
    icon: '🌿',
    title: 'Spiritual / Inner',
    color: '#38b2ac',
    tips: [
      { title: 'Sit quietly for 5 minutes', desc: 'Just sit. No phone, no tasks. Let your mind settle. This is enough.' },
      { title: 'Spend time in nature', desc: 'Even 20 minutes in green space lowers stress hormones significantly.' },
      { title: 'Reflect on your values', desc: 'Ask yourself: "What matters most to me?" Reconnecting with values reduces anxiety.' },
      { title: 'Practice self-compassion', desc: 'Talk to yourself as you would to a good friend going through a hard time.' },
      { title: 'Do a simple mindful activity', desc: 'Make tea, wash dishes, or walk — but do it with full, gentle attention.' },
    ],
  },
]

export default function SelfCarePage() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [checked, setChecked] = useState({})

  const toggleCheck = (catId, i) => {
    const key = `${catId}-${i}`
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const totalChecked = Object.values(checked).filter(Boolean).length

  return (
    <div className="page-container">
      <h1 className="page-title">✨ Self-Care Suggestions</h1>
      <p className="page-subtitle">
        Small, intentional acts of care add up. Browse by category and try one today.
      </p>

      {totalChecked > 0 && (
        <div className="selfcare-progress-banner">
          🎉 You've completed <strong>{totalChecked}</strong> self-care item{totalChecked !== 1 ? 's' : ''} today. Keep going!
        </div>
      )}

      {/* Category Tabs */}
      <div className="selfcare-tabs">
        <button
          className={`selfcare-tab ${activeCategory === null ? 'selfcare-tab--active' : ''}`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`selfcare-tab ${activeCategory === cat.id ? 'selfcare-tab--active' : ''}`}
            style={activeCategory === cat.id ? { borderColor: cat.color, color: cat.color } : {}}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.icon} {cat.title}
          </button>
        ))}
      </div>

      {/* Cards */}
      {CATEGORIES.filter(c => !activeCategory || c.id === activeCategory).map(cat => (
        <div key={cat.id} className="selfcare-category">
          <h2 className="selfcare-cat-title" style={{ color: cat.color }}>
            {cat.icon} {cat.title}
          </h2>
          <div className="selfcare-tips-list">
            {cat.tips.map((tip, i) => {
              const key = `${cat.id}-${i}`
              const isChecked = checked[key]
              return (
                <div
                  key={i}
                  className={`selfcare-tip ${isChecked ? 'selfcare-tip--done' : ''}`}
                  onClick={() => toggleCheck(cat.id, i)}
                >
                  <div className="selfcare-tip-check" style={{ borderColor: cat.color, background: isChecked ? cat.color : '' }}>
                    {isChecked && '✓'}
                  </div>
                  <div className="selfcare-tip-content">
                    <div className="selfcare-tip-title">{tip.title}</div>
                    <div className="selfcare-tip-desc">{tip.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Crisis reminder */}
      <div className="selfcare-crisis">
        <strong>Need more support?</strong> If you're struggling beyond what self-care can address,
        please reach out to a mental health professional or call <strong>988</strong> (US crisis line).
      </div>
    </div>
  )
}
