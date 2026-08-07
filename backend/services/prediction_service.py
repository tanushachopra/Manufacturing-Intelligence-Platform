import joblib
import pandas as pd

# Load model only once
model = joblib.load(
    "ml/models/predictive_maintenance_model.pkl"
)


def predict_failure(machine_data: dict):

    df = pd.DataFrame([machine_data])

    prediction = model.predict(df)[0]

    probability = model.predict_proba(df)[0][1]

    return {
        "failure_prediction": int(prediction),
        "failure_probability": round(
            float(probability) * 100,
            2,
        ),
    }