from services.telemetry_service import get_machine_data
from services.prediction_service import predict_failure
from services.rul_service import predict_rul
from services.anomaly_service import detect_anomaly


def get_ai_insights(machine_id: str):

    telemetry = get_machine_data(machine_id)

    if telemetry is None:
        return None

    prediction = predict_failure(telemetry)

    rul = predict_rul(telemetry)

    anomaly = detect_anomaly(telemetry)

    return {
        "machine": machine_id,

        "telemetry": telemetry,

        "predictive_maintenance": prediction,

        "remaining_useful_life": rul,

        "anomaly_detection": anomaly,
    }