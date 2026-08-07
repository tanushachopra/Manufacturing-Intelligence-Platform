from fastapi import APIRouter
from pydantic import BaseModel

from services.anomaly_service import detect_anomaly

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


@router.post("/anomaly")
def anomaly(data: MachineInput):
    return detect_anomaly(data.model_dump())