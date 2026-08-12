import pandas as pd
import numpy as np
from datetime import datetime


class SensorSimulator:

    def __init__(self):

        self.data = pd.read_csv(
            "data/raw/manufacturing_dataset.csv"
        )

        self.machine_data = {}

        for machine_id in self.data["machine_id"].unique():

            machine_rows = self.data[
                self.data["machine_id"] == machine_id
            ]

            if not machine_rows.empty:
                self.machine_data[machine_id] = (
                    machine_rows.iloc[-1].to_dict()
                )

    def get_sensor_reading(
        self,
        machine_id: str,
        scenario: str = "healthy"
    ):

        if machine_id not in self.machine_data:
            return None

        current_data = self.machine_data[machine_id].copy()

        scenario = scenario.lower().strip()

        if scenario not in {
            "healthy",
            "degrading",
            "critical"
        }:
            scenario = "healthy"

        # ---------------------------------------
        # BASE SENSOR FLUCTUATION
        # ---------------------------------------

        protected_columns = {
            "machine_id",
            "material_type",
            "operator_shift",
            "timestamp",
        }

        for column, value in current_data.items():

            if column in protected_columns:
                continue

            if isinstance(
                value,
                (int, float, np.integer, np.floating)
            ):

                noise = np.random.normal(
                    loc=0,
                    scale=max(
                        abs(float(value)) * 0.01,
                        0.01
                    )
                )

                current_data[column] = (
                    float(value) + noise
                )

        # ---------------------------------------
        # MACHINE HEALTH SCENARIOS
        # ---------------------------------------

        if scenario == "degrading":

            current_data["temperature"] += np.random.uniform(
                5, 10
            )

            current_data["vibration"] += np.random.uniform(
                0.10, 0.25
            )

            current_data["motor_current"] += np.random.uniform(
                2, 4
            )

            current_data["power_consumption"] += np.random.uniform(
                0.5, 1.5
            )

            current_data["tool_wear"] += np.random.uniform(
                10, 20
            )

            current_data["coolant_flow"] -= np.random.uniform(
                1, 3
            )

            current_data["cycle_time"] += np.random.uniform(
                5, 12
            )

        elif scenario == "critical":

            current_data["temperature"] += np.random.uniform(
                15, 30
            )

            current_data["vibration"] += np.random.uniform(
                0.40, 0.80
            )

            current_data["motor_current"] += np.random.uniform(
                6, 10
            )

            current_data["power_consumption"] += np.random.uniform(
                2, 4
            )

            current_data["tool_wear"] += np.random.uniform(
                30, 45
            )

            current_data["coolant_flow"] -= np.random.uniform(
                5, 9
            )

            current_data["cycle_time"] += np.random.uniform(
                15, 30
            )

        # ---------------------------------------
        # SAFETY LIMITS
        # ---------------------------------------

        current_data["temperature"] = max(
            0,
            current_data["temperature"]
        )

        current_data["vibration"] = max(
            0,
            current_data["vibration"]
        )

        current_data["motor_current"] = max(
            0,
            current_data["motor_current"]
        )

        current_data["power_consumption"] = max(
            0,
            current_data["power_consumption"]
        )

        current_data["tool_wear"] = min(
            100,
            max(0, current_data["tool_wear"])
        )

        current_data["coolant_flow"] = max(
            0,
            current_data["coolant_flow"]
        )

        current_data["cycle_time"] = max(
            0,
            current_data["cycle_time"]
        )

        # ---------------------------------------
        # TIMESTAMP
        # ---------------------------------------

        current_data["timestamp"] = (
            datetime.now().isoformat()
        )

        # ---------------------------------------
        # REMOVE TRAINING LABELS
        # ---------------------------------------

        current_data.pop("failure", None)
        current_data.pop(
            "remaining_useful_life",
            None
        )
        current_data.pop("quality", None)

        # Store latest simulated state
        self.machine_data[machine_id] = current_data

        return current_data


# ---------------------------------------
# CREATE SIMULATOR INSTANCE
# ---------------------------------------

sensor_simulator = SensorSimulator()