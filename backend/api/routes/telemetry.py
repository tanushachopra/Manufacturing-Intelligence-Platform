from fastapi import APIRouter, HTTPException, Query

from services.telemetry_service import (
    get_machine_data,
)

router = APIRouter()


@router.get("/machine/{machine_id}")
def machine(
    machine_id: str,
    scenario: str = Query(
        default="healthy",
        description="Machine condition: healthy, degrading, or critical"
    )
):

    # Validate scenario
    if scenario not in {
        "healthy",
        "degrading",
        "critical",
    }:
        raise HTTPException(
            status_code=400,
            detail="Scenario must be healthy, degrading, or critical",
        )

    data = get_machine_data(
        machine_id,
        scenario
    )

    if data is None:
        raise HTTPException(
            status_code=404,
            detail="Machine not found",
        )

    return data