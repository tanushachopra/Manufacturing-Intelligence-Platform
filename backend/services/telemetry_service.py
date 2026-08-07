import pandas as pd

DATA = pd.read_csv(
    "data/raw/manufacturing_dataset.csv"
)


def get_machine_data(machine_id: str):

    machine = DATA[
        DATA["machine_id"] == machine_id
    ]

    if machine.empty:
        return None

    latest = machine.iloc[-1]

    return latest.to_dict()