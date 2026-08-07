from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.copilot_service import ask_copilot


router = APIRouter()


class CopilotRequest(BaseModel):
    question: str


@router.post("/copilot")
def copilot(request: CopilotRequest):

    if not request.question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty"
        )

    try:

        answer = ask_copilot(request.question)

        return {
            "answer": answer
        }

    except Exception as e:

        print("COPILOT ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )