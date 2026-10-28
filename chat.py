from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.ai_service import get_ai_response

router = APIRouter()


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Send a conversation to the AI and receive a response."""
    messages = [{"role": m.role, "content": m.content} for m in request.messages]
    reply = await get_ai_response(messages)
    return ChatResponse(reply=reply)
