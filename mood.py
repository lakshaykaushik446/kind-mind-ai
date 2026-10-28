from fastapi import APIRouter
from app.models.schemas import MoodEntry, MoodHistoryResponse
from datetime import datetime, timezone
from typing import List

router = APIRouter()

# In-memory storage for the prototype (replace with a DB for production)
_mood_entries: List[dict] = []


@router.post("", response_model=MoodEntry)
def log_mood(entry: MoodEntry):
    """Log a mood check-in entry."""
    record = entry.model_dump()
    record["timestamp"] = datetime.now(timezone.utc).isoformat()
    _mood_entries.append(record)
    return record


@router.get("/history", response_model=MoodHistoryResponse)
def get_mood_history():
    """Return all mood check-in entries."""
    return MoodHistoryResponse(entries=_mood_entries)


@router.delete("/history")
def clear_mood_history():
    """Clear all mood history (prototype utility)."""
    _mood_entries.clear()
    return {"message": "Mood history cleared"}
