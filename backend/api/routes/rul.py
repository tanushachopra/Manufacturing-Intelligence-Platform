from fastapi import APIRouter
from pydantic import BaseModel

from services.rul_service import predict_rul

router = APIRouter()


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


@router.post("/rul")
def predict(data: MachineInput):
    return predict_rul(data.model_dump())