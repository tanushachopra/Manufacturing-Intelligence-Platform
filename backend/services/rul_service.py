import joblib
import pandas as pd

# Load the trained RUL model
model = joblib.load("ml/models/rul_model.pkl")


def predict_rul(machine_data: dict):

    df = pd.DataFrame([machine_data])

    prediction = model.predict(df)[0]

    return {
        "remaining_useful_life": round(float(prediction), 2)
    }