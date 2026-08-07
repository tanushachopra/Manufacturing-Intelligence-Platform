import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

# ---------------------------------------
# Load Dataset
# ---------------------------------------

print("Loading dataset...")

df = pd.read_csv("../../data/raw/manufacturing_dataset.csv")

print(f"Dataset Loaded: {len(df)} records")

# ---------------------------------------
# Features & Target
# ---------------------------------------

X = df.drop(
    columns=[
        "failure",
        "remaining_useful_life",
        "quality",
        "timestamp",
    ]
)

y = df["remaining_useful_life"]

# ---------------------------------------
# Columns
# ---------------------------------------

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

model = RandomForestRegressor(
    n_estimators=50,
    max_depth=12,
    n_jobs=-1,
    random_state=42,
)

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model),
    ]
)

# ---------------------------------------
# Train Test Split
# ---------------------------------------

print("Splitting dataset...")

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

# ---------------------------------------
# Train
# ---------------------------------------

print("Training Random Forest RUL Model...")

pipeline.fit(X_train, y_train)

print("Training Complete!")

# ---------------------------------------
# Evaluate
# ---------------------------------------

predictions = pipeline.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("\n==============================")
print("MODEL PERFORMANCE")
print("==============================")

print(f"Mean Absolute Error : {mae:.2f}")
print(f"R² Score            : {r2:.3f}")

# ---------------------------------------
# Save Model
# ---------------------------------------

joblib.dump(
    pipeline,
    "rul_model.pkl",
)

print("\nModel Saved Successfully!")
print("Location: rul_model.pkl")