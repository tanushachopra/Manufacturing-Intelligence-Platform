import random
from datetime import datetime, timedelta

import numpy as np
import pandas as pd

# -----------------------------
# Configuration
# -----------------------------

random.seed(42)
np.random.seed(42)

NUM_MACHINES = 50
RECORDS_PER_MACHINE = 2000

machines = [f"CNC-{i:03d}" for i in range(1, NUM_MACHINES + 1)]

rows = []

start_time = datetime(2026, 1, 1)

# -----------------------------
# Generate Data
# -----------------------------

for machine in machines:

    tool_wear = random.uniform(0, 5)

    base_temp = random.uniform(42, 46)
    base_vibration = random.uniform(0.18, 0.23)
    base_power = random.uniform(4.3, 4.9)
    base_current = random.uniform(10.5, 12.5)

    anomaly_timer = 0

    for minute in range(RECORDS_PER_MACHINE):

        timestamp = start_time + timedelta(minutes=minute)

        # Tool gradually wears
        tool_wear += np.random.uniform(0.01, 0.04)

        # Random anomaly
        if anomaly_timer == 0 and random.random() < 0.012:
            anomaly_timer = random.randint(15, 60)

        anomaly = anomaly_timer > 0

        temperature = (
            base_temp
            + tool_wear * 0.08
            + np.random.normal(0, 0.7)
        )

        vibration = (
            base_vibration
            + tool_wear * 0.0016
            + np.random.normal(0, 0.008)
        )

        power = (
            base_power
            + tool_wear * 0.006
            + np.random.normal(0, 0.06)
        )

        current = (
            base_current
            + tool_wear * 0.015
            + np.random.normal(0, 0.15)
        )

        spindle_speed = np.random.normal(2500, 70)

        feed_rate = np.random.normal(110, 4)

        coolant_flow = np.random.normal(16, 0.5)

        cycle_time = np.random.normal(60, 2)

        humidity = np.random.normal(55, 5)

        ambient_temperature = np.random.normal(27, 1)

        air_pressure = np.random.normal(5.5, 0.15)

        material = random.choice(
            ["Steel", "Aluminium", "Titanium"]
        )

        shift = random.choice(
            ["A", "B", "C"]
        )

        # During anomaly all sensors drift together
        if anomaly:

            temperature += np.random.uniform(8, 14)

            vibration += np.random.uniform(0.10, 0.18)

            power += np.random.uniform(0.5, 1.2)

            current += np.random.uniform(1.0, 2.0)

            anomaly_timer -= 1

        # Failure score
        score = (
            (temperature - 45) * 0.24
            + vibration * 36
            + tool_wear * 0.09
            + power * 0.8
            + current * 0.35
        )

        probability = 1 / (1 + np.exp(-(score - 18)))

        failure = (
            1
            if random.random() < probability
            else 0
        )

        remaining_life = max(
            0,
            int(
                180
                - tool_wear * 1.8
                - temperature * 0.6
                + np.random.normal(0, 5)
            ),
        )

        quality = (
            0
            if (
                vibration > 0.35
                or temperature > 54
            )
            else 1
        )

        rows.append(
            {
                "timestamp": timestamp,
                "machine_id": machine,
                "temperature": round(temperature, 2),
                "vibration": round(vibration, 3),
                "spindle_speed": round(spindle_speed, 2),
                "power_consumption": round(power, 2),
                "motor_current": round(current, 2),
                "tool_wear": round(tool_wear, 2),
                "feed_rate": round(feed_rate, 2),
                "coolant_flow": round(coolant_flow, 2),
                "cycle_time": round(cycle_time, 2),
                "humidity": round(humidity, 2),
                "ambient_temperature": round(
                    ambient_temperature,
                    2,
                ),
                "air_pressure": round(
                    air_pressure,
                    2,
                ),
                "material_type": material,
                "operator_shift": shift,
                "failure": failure,
                "remaining_useful_life": remaining_life,
                "quality": quality,
            }
        )

# -----------------------------
# Save Dataset
# -----------------------------

df = pd.DataFrame(rows)

output_path = "../../data/raw/manufacturing_dataset.csv"

df.to_csv(output_path, index=False)

print("=" * 60)
print("DATASET GENERATED SUCCESSFULLY")
print("=" * 60)
print(f"Rows        : {len(df)}")
print(f"Machines    : {NUM_MACHINES}")
print(f"Failures    : {df['failure'].sum()}")
print(f"Output File : {output_path}")
print("=" * 60)

print(df.head())