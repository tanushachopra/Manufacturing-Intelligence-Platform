from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.prediction_service import predict_failure
from services.telemetry_service import get_machine_data


router = APIRouter()


# =========================================================
# MACHINE INPUT
# =========================================================

class MachineInput(BaseModel):

    machine_id: str
    temperature: float
    vibration: float
    spindle_speed: float
    power_consumption: float
    motor_current: float
    tool_wear: float
    feed_rate: float
    coolant_flow: float
    cycle_time: float
    humidity: float
    ambient_temperature: float
    air_pressure: float
    material_type: str
    operator_shift: str


# =========================================================
# MANUAL ML PREDICTION
# =========================================================

@router.post("/predict")
def predict(data: MachineInput):

    return predict_failure(
        data.model_dump()
    )


# =========================================================
# LIVE SIMULATED IoT → ML PREDICTION
# =========================================================

@router.get("/predict-live/{machine_id}")
def predict_live(machine_id: str):

    # Get fresh simulated sensor telemetry
    machine_data = get_machine_data(machine_id)

    if machine_data is None:

        raise HTTPException(
            status_code=404,
            detail=f"Machine '{machine_id}' not found"
        )

    # Send the fresh telemetry to the trained ML model
    prediction = predict_failure(machine_data)

    # Return both telemetry and ML prediction
    return {
        "machine_id": machine_id,
        "telemetry": machine_data,
        "prediction": prediction,
    }