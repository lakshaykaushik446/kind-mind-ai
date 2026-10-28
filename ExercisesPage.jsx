import React, { useState, useEffect, useRef } from 'react'
import './ExercisesPage.css'

// ─────────────────────────────────────────────
// Breathing exercise engine
// ─────────────────────────────────────────────
const BREATHING_EXERCISES = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Inhale, hold, exhale, hold — each for 4 seconds. Used by Navy SEALs to calm under pressure.',
    steps: [
      { label: 'Inhale', duration: 4, color: '#6c63ff' },
      { label: 'Hold', duration: 4, color: '#38b2ac' },
      { label: 'Exhale', duration: 4, color: '#805ad5' },
      { label: 'Hold', duration: 4, color: '#38b2ac' },
    ],
    cycles: 4,
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'A calming technique: inhale for 4, hold for 7, exhale for 8. Promotes relaxation and sleep.',
    steps: [
      { label: 'Inhale', duration: 4, color: '#6c63ff' },
      { label: 'Hold', duration: 7, color: '#38b2ac' },
      { label: 'Exhale', duration: 8, color: '#805ad5' },
    ],
    cycles: 3,
  },
  {
    id: 'calm',
    name: 'Calming Breath',
    description: 'Simple 5-5-5 breathing to quickly reduce anxiety anywhere, anytime.',
    steps: [
      { label: 'Inhale', duration: 5, color: '#6c63ff' },
      { label: 'Hold', duration: 5, color: '#38b2ac' },
      { label: 'Exhale', duration: 5, color: '#805ad5' },
    ],
    cycles: 4,
  },
]

// ─────────────────────────────────────────────
// Grounding exercises (5-4-3-2-1 etc.)
// ─────────────────────────────────────────────
const GROUNDING_EXERCISES = [
  {
    id: '54321',
    name: '5-4-3-2-1 Grounding',
    icon: '🖐️',
    steps: [
      { prompt: '👀 Name 5 things you can SEE right now.', type: 'reflect' },
      { prompt: '✋ Name 4 things you can TOUCH right now.', type: 'reflect' },
      { prompt: '👂 Name 3 things you can HEAR right now.', type: 'reflect' },
      { prompt: '👃 Name 2 things you can SMELL right now.', type: 'reflect' },
      { prompt: '👅 Name 1 thing you can TASTE right now.', type: 'reflect' },
    ],
    tip: 'This technique interrupts the anxiety cycle by engaging all your senses in the present moment.',
  },
  {
    id: 'safe-place',
    name: 'Safe Place Visualization',
    icon: '🏡',
    steps: [
      { prompt: 'Close your eyes. Take three slow, deep breaths.', type: 'pause' },
      { prompt: 'Imagine a place where you feel completely safe and at peace. It can be real or imaginary.', type: 'pause' },
      { prompt: 'Notice the details: What does it look like? What sounds do you hear?', type: 'reflect' },
      { prompt: 'What does the air feel like on your skin? What smells are there?', type: 'reflect' },
      { prompt: 'Let yourself rest here for a moment. You are safe. You are okay.', type: 'pause' },
    ],
    tip: 'A safe place visualization can reduce anxiety and help you return to a calm baseline.',
  },
  {
    id: 'body-scan',
    name: 'Quick Body Scan',
    icon: '🧘',
    steps: [
      { prompt: 'Sit comfortably. Feel your feet on the floor or hands in your lap.', type: 'pause' },
      { prompt: 'Notice your feet and legs. Are they tense? Gently relax them.', type: 'pause' },
      { prompt: 'Move attention to your stomach and chest. Take a slow breath. Let any tension go.', type: 'pause' },
      { prompt: 'Notice your shoulders and neck. Roll them back gently. Release any tightness.', type: 'pause' },
      { prompt: 'Relax your jaw and face. You\'ve done great. Take one final deep breath.', type: 'pause' },
    ],
    tip: 'Body scans release physical tension that often accompanies stress and anxiety.',
  },
]

// ─────────────────────────────────────────────
// Breathing Timer Component
// ─────────────────────────────────────────────
function BreathingTimer({ exercise, onFinish }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(exercise.steps[0].duration)
  const [done, setDone] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 1) return prev - 1
        // Move to next step
        clearInterval(intervalRef.current)
        setStepIndex(si => {
          const nextSi = (si + 1) % exercise.steps.length
          const finishedCycle = nextSi === 0
          if (finishedCycle) {
            setCycleCount(c => {
              const nextCycle = c + 1
              if (nextCycle >= exercise.cycles) {
                setDone(true)
                return nextCycle
              }
              setSecondsLeft(exercise.steps[0].duration)
              return nextCycle
            })
          } else {
            setSecondsLeft(exercise.steps[nextSi].duration)
          }
          return nextSi
        })
        return 0
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [stepIndex, cycleCount])

  const currentStep = exercise.steps[stepIndex]
  const progress = 1 - (secondsLeft / currentStep.duration)

  if (done) {
    return (
      <div className="breathing-done">
        <div className="breathing-done-icon">✅</div>
        <h3>Great job! Exercise complete.</h3>
        <p>Take a moment to notice how you feel now compared to before.</p>
        <button className="btn btn-primary" onClick={onFinish}>Back to Exercises</button>
      </div>
    )
  }

  const circumference = 2 * Math.PI * 54
  const offset = circumference * (1 - progress)

  return (
    <div className="breathing-timer">
      <p className="breathing-name">{exercise.name}</p>
      <p className="breathing-cycle">Cycle {cycleCount + 1} of {exercise.cycles}</p>
      <div className="breathing-circle-container">
        <svg width="140" height="140" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke={currentStep.color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - offset * circumference / 1}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
        <div className="breathing-circle-label">
          <div className="breathing-step-label">{currentStep.label}</div>
          <div className="breathing-seconds">{secondsLeft}s</div>
        </div>
      </div>
      <button className="btn btn-secondary btn-sm" onClick={onFinish}>Stop</button>
    </div>
  )
}

// ─────────────────────────────────────────────
// Grounding Guide Component
// ─────────────────────────────────────────────
function GroundingGuide({ exercise, onFinish }) {
  const [stepIndex, setStepIndex] = useState(0)

  const step = exercise.steps[stepIndex]
  const isLast = stepIndex === exercise.steps.length - 1

  return (
    <div className="grounding-guide">
      <p className="grounding-exercise-name">{exercise.icon} {exercise.name}</p>
      <div className="grounding-step">
        <div className="grounding-step-num">Step {stepIndex + 1} of {exercise.steps.length}</div>
        <div className="grounding-step-prompt">{step.prompt}</div>
      </div>
      <div className="grounding-actions">
        {stepIndex > 0 && (
          <button className="btn btn-secondary" onClick={() => setStepIndex(i => i - 1)}>← Back</button>
        )}
        {!isLast ? (
          <button className="btn btn-primary" onClick={() => setStepIndex(i => i + 1)}>Next →</button>
        ) : (
          <button className="btn btn-primary" onClick={onFinish}>✅ Finish</button>
        )}
      </div>
      <div className="grounding-tip">
        💡 <em>{exercise.tip}</em>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function ExercisesPage() {
  const [active, setActive] = useState(null) // { type: 'breathing'|'grounding', exercise }

  if (active) {
    return (
      <div className="page-container exercises-active">
        <button className="btn btn-secondary btn-sm exercises-back" onClick={() => setActive(null)}>
          ← All Exercises
        </button>
        {active.type === 'breathing'
          ? <BreathingTimer exercise={active.exercise} onFinish={() => setActive(null)} />
          : <GroundingGuide exercise={active.exercise} onFinish={() => setActive(null)} />
        }
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1 className="page-title">🌬️ Breathing & Grounding</h1>
      <p className="page-subtitle">
        These quick exercises can help calm your nervous system and bring you back to the present moment.
      </p>

      <h2 className="exercises-section-title">🫁 Breathing Exercises</h2>
      <div className="exercises-grid">
        {BREATHING_EXERCISES.map(ex => (
          <div key={ex.id} className="exercise-card card">
            <h3>{ex.name}</h3>
            <p>{ex.description}</p>
            <div className="exercise-meta">
              {ex.cycles} cycles · {ex.steps.map(s => `${s.duration}s`).join(' – ')}
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setActive({ type: 'breathing', exercise: ex })}
            >
              ▶ Start
            </button>
          </div>
        ))}
      </div>

      <h2 className="exercises-section-title" style={{ marginTop: 36 }}>🌱 Grounding Exercises</h2>
      <div className="exercises-grid">
        {GROUNDING_EXERCISES.map(ex => (
          <div key={ex.id} className="exercise-card card">
            <h3>{ex.icon} {ex.name}</h3>
            <p>{ex.tip}</p>
            <div className="exercise-meta">{ex.steps.length} steps</div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setActive({ type: 'grounding', exercise: ex })}
            >
              ▶ Start
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
