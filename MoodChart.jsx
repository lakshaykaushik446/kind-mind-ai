import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const EMOTION_COLORS = {
  Happy: '#f6e05e',
  Calm: '#68d391',
  Neutral: '#a0aec0',
  Sad: '#76e4f7',
  Anxious: '#f6ad55',
  Angry: '#fc8181',
  Exhausted: '#b794f4',
  Grateful: '#fbb6ce',
}

export default function MoodChart({ entries }) {
  const data = entries.map((entry, i) => ({
    name: new Date(entry.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    intensity: entry.intensity,
    emotion: entry.emotion,
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { intensity, emotion } = payload[0].payload
      return (
        <div style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          padding: '10px 14px',
          fontSize: 13,
        }}>
          <div><strong>{label}</strong></div>
          <div>Emotion: {emotion}</div>
          <div>Intensity: {intensity} / 10</div>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="intensity"
          stroke="#6c63ff"
          strokeWidth={2.5}
          dot={{ r: 5, fill: '#6c63ff', strokeWidth: 0 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
