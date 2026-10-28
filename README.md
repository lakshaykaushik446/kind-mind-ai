# Mental Health Companion AI Chatbot — Kind Mind AI

An AI-powered wellness companion that helps users discuss everyday emotions, manage stress, reflect on their mood, and learn healthy coping techniques.

---

## ⚠️ Disclaimer

**Kind Mind AI is not a therapist.** It cannot diagnose or treat mental health conditions. It provides general wellness support only. If you or someone you know is in crisis, please contact:
- **988 Suicide & Crisis Lifeline** — call or text **988** (US)
- **Crisis Text Line** — text HOME to **741741**
- Emergency services — **911**

---

## 🗂 Project Structure

```
mental-health-chatbot/
├── backend/                  # Python FastAPI backend
│   ├── app/
│   │   ├── main.py           # FastAPI app entry point
│   │   ├── routers/          # Route handlers (chat, mood, journal)
│   │   ├── services/         # AI service (modular LLM connector)
│   │   └── models/           # Pydantic schemas
│   ├── .env                  # API keys (never commit to git!)
│   ├── requirements.txt
│   └── run.py
└── frontend/                 # React + Vite frontend
    ├── src/
    │   ├── pages/            # All page components
    │   ├── components/       # Shared components (MoodChart, Disclaimer)
    │   └── services/         # API client layer
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Quick Start

### 1. Backend

```bash
cd mental-health-chatbot/backend

# Create and activate a virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure your AI provider in .env
# Default is "mock" (no API key required for testing)
# Set AI_PROVIDER=openai and add your OPENAI_API_KEY for real AI responses

# Run the server
python run.py
# → API available at http://localhost:8000
# → Docs at http://localhost:8000/docs
```

### 2. Frontend

```bash
cd mental-health-chatbot/frontend

npm install
npm run dev
# → App available at http://localhost:5173
```

---

## 🤖 AI Providers

Set `AI_PROVIDER` in `backend/.env`:

| Value | Description |
|-------|-------------|
| `mock` | Built-in responses, no API key needed (great for testing) |
| `openai` | Uses OpenAI API (GPT-4o-mini by default). Set `OPENAI_API_KEY`. |
| `anthropic` | Uses Anthropic API (Claude). Set `ANTHROPIC_API_KEY`. |

---

## ✨ Features

1. **Modern Homepage** — welcoming hero section, feature grid, crisis banner
2. **AI Chat** — empathetic message bubbles, typing indicator, crisis detection
3. **Mood Check-In** — 8 emotions, intensity slider, optional note
4. **Mood History Chart** — line chart of intensity over time (via Recharts)
5. **Private Journal** — write, view, and delete entries; clear all
6. **Breathing Exercises** — Box, 4-7-8, and Calming Breath with animated timer
7. **Grounding Exercises** — 5-4-3-2-1, Safe Place, Body Scan — step-by-step guides
8. **Self-Care Suggestions** — 20+ tips across Physical, Mental, Social, Spiritual
9. **Disclaimer** — persistent footer with crisis helpline links
10. **Safe-Response Mechanism** — automatic crisis response in chat when distress keywords detected

---

## 🔒 Security Notes

- API keys are stored in `backend/.env` — **never** commit this file
- The frontend never touches API keys — all AI calls go through the backend
- `.env` is listed in `.gitignore`
