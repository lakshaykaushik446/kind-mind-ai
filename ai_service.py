"""
Modular AI service — connects to a supported LLM API.
Swap out the provider by changing AI_PROVIDER in your .env file.
Supported: "openai" (default), "anthropic", "mock" (for testing without an API key)
"""

import os
from typing import List, Dict

AI_PROVIDER = os.getenv("AI_PROVIDER", "openai")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
AI_MODEL = os.getenv("AI_MODEL", "gpt-4o-mini")

SYSTEM_PROMPT = """You are a compassionate, empathetic mental wellness companion named Kind Mind AI.
Your role is to:
- Listen actively and respond with warmth and understanding
- Help users explore their emotions without judgment
- Suggest healthy coping strategies and self-care techniques
- Encourage professional help when appropriate
- NEVER diagnose, prescribe, or replace professional mental health care

IMPORTANT SAFETY RULE: If a user expresses thoughts of self-harm, suicide, or serious crisis,
immediately and gently encourage them to contact a crisis helpline (e.g., 988 Suicide & Crisis Lifeline
in the US, or local emergency services), reach out to a trusted person, or seek professional help.
Do not attempt to handle crisis situations alone.

Keep responses concise, warm, and grounded. Avoid clinical language."""

CRISIS_KEYWORDS = [
    "suicide", "suicidal", "kill myself", "end my life", "self-harm", "self harm",
    "hurt myself", "want to die", "no reason to live", "can't go on", "cannot go on",
    "give up on life", "overdose",
]

CRISIS_RESPONSE = """I hear you, and I'm really glad you reached out. What you're feeling right now sounds incredibly painful, and you deserve immediate support from someone who can truly help.

**Please reach out now:**
- 🆘 **988 Suicide & Crisis Lifeline** — call or text **988** (US)
- 🌍 **Crisis Text Line** — text HOME to **741741**
- 🚨 **Emergency services** — call **911** (or your local emergency number)
- 💙 Talk to a trusted friend, family member, or mental health professional

You are not alone. These services are free, confidential, and available 24/7. Please reach out to them right now. 💙"""


def detect_crisis(message: str) -> bool:
    """Check if message contains crisis-related keywords."""
    lower = message.lower()
    return any(keyword in lower for keyword in CRISIS_KEYWORDS)


async def get_ai_response(messages: List[Dict[str, str]]) -> str:
    """
    Route to the configured AI provider and return a response string.
    messages: list of {"role": "user"|"assistant", "content": "..."}
    """
    # Safety check on latest user message
    if messages and detect_crisis(messages[-1].get("content", "")):
        return CRISIS_RESPONSE

    if AI_PROVIDER == "openai":
        return await _openai_response(messages)
    elif AI_PROVIDER == "anthropic":
        return await _anthropic_response(messages)
    else:
        return await _mock_response(messages)


async def _openai_response(messages: List[Dict[str, str]]) -> str:
    try:
        from openai import AsyncOpenAI
        client = AsyncOpenAI(api_key=OPENAI_API_KEY)
        full_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages
        response = await client.chat.completions.create(
            model=AI_MODEL,
            messages=full_messages,
            max_tokens=500,
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"I'm having trouble connecting right now. Please try again in a moment. (Error: {str(e)[:80]})"


async def _anthropic_response(messages: List[Dict[str, str]]) -> str:
    try:
        import anthropic
        client = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY)
        response = await client.messages.create(
            model=AI_MODEL,
            max_tokens=500,
            system=SYSTEM_PROMPT,
            messages=messages,
        )
        return response.content[0].text
    except Exception as e:
        return f"I'm having trouble connecting right now. Please try again in a moment. (Error: {str(e)[:80]})"


async def _mock_response(messages: List[Dict[str, str]]) -> str:
    """Mock provider for testing without an API key."""
    last = messages[-1]["content"].lower() if messages else ""
    if any(w in last for w in ["sad", "depressed", "down", "unhappy"]):
        return "I'm really sorry to hear you're feeling this way. It takes courage to share that. Would you like to talk more about what's been going on, or would a simple breathing exercise help right now?"
    if any(w in last for w in ["anxious", "anxiety", "stressed", "stress", "overwhelmed"]):
        return "Stress and anxiety can feel so heavy. You're not alone in this. Let's try to slow things down a bit — would a short grounding exercise be helpful?"
    if any(w in last for w in ["happy", "good", "great", "wonderful"]):
        return "That's wonderful to hear! It's so important to notice and celebrate the good moments. What's been bringing you joy today?"
    return "Thank you for sharing that with me. I'm here to listen and support you. How are you feeling right now, on a scale from 1 to 10?"
