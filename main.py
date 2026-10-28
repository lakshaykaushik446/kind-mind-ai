import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat, mood, journal

app = FastAPI(
    title="Mental Health Companion API",
    description="AI-powered wellness companion backend",
    version="1.0.0",
)

# Allow localhost in dev + any Vercel preview/prod URL set via ALLOWED_ORIGINS env var
_extra_origins = os.getenv("ALLOWED_ORIGINS", "")
allowed_origins = ["http://localhost:5173"] + [o.strip() for o in _extra_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(mood.router, prefix="/api/mood", tags=["mood"])
app.include_router(journal.router, prefix="/api/journal", tags=["journal"])


@app.get("/")
def health_check():
    return {"status": "ok", "message": "Mental Health Companion API is running"}
