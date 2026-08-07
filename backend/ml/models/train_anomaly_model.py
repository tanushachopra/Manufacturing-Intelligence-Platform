import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import IsolationForest
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

print("Loading Dataset...")

df = pd.read_csv("../../data/raw/manufacturing_dataset.csv")

print(f"Dataset Loaded: {len(df)} records")

# ---------------------------------------
# Features
# ---------------------------------------

X = df.drop(
    columns=[
        "failure",
        "remaining_useful_life",
        "quality",
        "timestamp",
    ]
)

categorical_features = [
    "machine_id",
    "material_type",
    "operator_shift",
]

numeric_features = [
    col
    for col in X.columns
    if col not in categorical_features
]

# ---------------------------------------
# Preprocessing
# ---------------------------------------

preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features,
        ),
        (
            "num",
            "passthrough",
            numeric_features,
        ),
    ]
)

# ---------------------------------------
# Model
# ---------------------------------------

model = IsolationForest(
    n_estimators=100,
    contamination=0.05,
    random_state=42,
)

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model),
    ]
)

print("Training Isolation Forest...")

pipeline.fit(X)

print("Training Complete!")

joblib.dump(
    pipeline,
    "anomaly_model.pkl",
)

print("Model Saved Successfully!")