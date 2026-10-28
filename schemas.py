from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]


class ChatResponse(BaseModel):
    reply: str


class MoodEntry(BaseModel):
    emotion: str
    intensity: int  # 1–10
    note: Optional[str] = None
    timestamp: Optional[str] = None


class MoodHistoryResponse(BaseModel):
    entries: List[MoodEntry]


class JournalEntry(BaseModel):
    id: Optional[str] = None
    content: str
    timestamp: Optional[str] = None


class JournalListResponse(BaseModel):
    entries: List[JournalEntry]
