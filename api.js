import axios from 'axios'

// In production, VITE_API_URL is set to your Railway backend URL.
// In development, requests go to /api which is proxied by Vite to localhost:8000.
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// ─── Chat ────────────────────────────────────

/**
 * Send chat messages to the AI.
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<string>} AI reply text
 */
export async function sendMessage(messages) {
  const res = await api.post('/chat', { messages })
  return res.data.reply
}

// ─── Mood ────────────────────────────────────

/**
 * Log a mood entry.
 * @param {{ emotion: string, intensity: number, note?: string }} entry
 */
export async function logMood(entry) {
  const res = await api.post('/mood', entry)
  return res.data
}

/**
 * Fetch all mood history entries.
 * @returns {Promise<{ entries: Array }>}
 */
export async function getMoodHistory() {
  const res = await api.get('/mood/history')
  return res.data
}

/**
 * Clear all mood history.
 */
export async function clearMoodHistory() {
  const res = await api.delete('/mood/history')
  return res.data
}

// ─── Journal ─────────────────────────────────

/**
 * Fetch all journal entries.
 * @returns {Promise<{ entries: Array }>}
 */
export async function getJournalEntries() {
  const res = await api.get('/journal')
  return res.data
}

/**
 * Create a new journal entry.
 * @param {{ content: string }} entry
 */
export async function createJournalEntry(entry) {
  const res = await api.post('/journal', entry)
  return res.data
}

/**
 * Delete a journal entry by ID.
 * @param {string} id
 */
export async function deleteJournalEntry(id) {
  const res = await api.delete(`/journal/${id}`)
  return res.data
}

/**
 * Clear all journal entries.
 */
export async function clearJournalEntries() {
  const res = await api.delete('/journal')
  return res.data
}
