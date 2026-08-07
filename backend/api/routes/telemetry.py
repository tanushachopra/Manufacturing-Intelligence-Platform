from fastapi import APIRouter, HTTPException

from services.telemetry_service import (
    get_machine_data,
)

router = APIRouter()


@router.get("/machine/{machine_id}")
def machine(machine_id: str):

    data = get_machine_data(machine_id)

    if data is None:
        raise HTTPException(
            status_code=404,
            detail="Machine not found",
        )

    return data