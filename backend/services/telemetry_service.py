import pandas as pd

from iot.sensor_simulator import sensor_simulator


# =========================================================
# HISTORICAL FACTORY DATA
# =========================================================

DATA = pd.read_csv(
    "data/raw/manufacturing_dataset.csv"
)


# =========================================================
# LIVE / SIMULATED TELEMETRY
# =========================================================

def get_machine_data(
    machine_id: str,
    scenario: str = "healthy"
):

    """
    Return the latest simulated sensor reading
    for the requested machine.

    The simulator acts as our current IoT data source.

    Scenarios:
    - healthy
    - degrading
    - critical

    Later, the same function can be connected to
    real ESP32/sensor data without changing the
    prediction layer.
    """

    return sensor_simulator.get_sensor_reading(
        machine_id,
        scenario
    )