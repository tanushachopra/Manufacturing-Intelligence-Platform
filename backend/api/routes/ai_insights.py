from fastapi import APIRouter, HTTPException

from services.ai_service import get_ai_insights

router = APIRouter()


@router.get("/ai-insights/{machine_id}")
def ai_insights(machine_id: str):

    result = get_ai_insights(machine_id)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Machine not found",
        )

    return result