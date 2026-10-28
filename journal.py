from fastapi import APIRouter, HTTPException
from app.models.schemas import JournalEntry, JournalListResponse
from datetime import datetime, timezone
from typing import List
import uuid

router = APIRouter()

# In-memory storage for the prototype (replace with a DB for production)
_journal_entries: List[dict] = []


@router.post("", response_model=JournalEntry)
def create_entry(entry: JournalEntry):
    """Create a new journal entry."""
    record = {
        "id": str(uuid.uuid4()),
        "content": entry.content,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    _journal_entries.append(record)
    return record


@router.get("", response_model=JournalListResponse)
def list_entries():
    """Return all journal entries."""
    return JournalListResponse(entries=_journal_entries)


@router.delete("/{entry_id}")
def delete_entry(entry_id: str):
    """Delete a specific journal entry by ID."""
    global _journal_entries
    before = len(_journal_entries)
    _journal_entries = [e for e in _journal_entries if e["id"] != entry_id]
    if len(_journal_entries) == before:
        raise HTTPException(status_code=404, detail="Entry not found")
    return {"message": "Entry deleted"}


@router.delete("")
def clear_all_entries():
    """Clear all journal entries."""
    _journal_entries.clear()
    return {"message": "All journal entries cleared"}
