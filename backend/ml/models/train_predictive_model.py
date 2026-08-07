import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from xgboost import XGBClassifier

# -----------------------------
# Load Dataset
# -----------------------------

df = pd.read_csv("../../data/raw/manufacturing_dataset.csv")

# -----------------------------
# Features
# -----------------------------

X = df.drop(
    columns=[
        "failure",
        "remaining_useful_life",
        "quality",
        "timestamp",
    ]
)

y = df["failure"]

# -----------------------------
# Categorical Columns
# -----------------------------

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

# -----------------------------
# Preprocessing
# -----------------------------

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

# -----------------------------
# Model
# -----------------------------

model = XGBClassifier(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    eval_metric="logloss",
)

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model),
    ]
)

# -----------------------------
# Split
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)

# -----------------------------
# Train
# -----------------------------

print("Training XGBoost...")

pipeline.fit(X_train, y_train)

print("Training Complete!")

# -----------------------------
# Predict
# -----------------------------

predictions = pipeline.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions,
)

print()

print("=" * 60)

print(f"Accuracy : {accuracy:.4f}")

print("=" * 60)

print()

print(classification_report(
    y_test,
    predictions,
))

print()

print(confusion_matrix(
    y_test,
    predictions,
))

# -----------------------------
# Save
# -----------------------------

joblib.dump(
    pipeline,
    "predictive_maintenance_model.pkl",
)

print()

print("Model Saved Successfully!")