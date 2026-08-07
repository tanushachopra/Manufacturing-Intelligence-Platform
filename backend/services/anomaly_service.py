import joblib
import pandas as pd

model = joblib.load("ml/models/anomaly_model.pkl")


def detect_anomaly(machine_data: dict):

    df = pd.DataFrame([machine_data])

    prediction = model.predict(df)[0]

    score = model.decision_function(df)[0]

    return {
        "anomaly": bool(prediction == -1),
        "anomaly_score": round(float(score), 4),
    }