import pandas as pd


def calculate_weights(passenger_data: pd.DataFrame):
    """
    Calculate route weights using passenger traffic share.

    Expected columns:
        route
        passengers
    """

    df = passenger_data.copy()

    total = df["passengers"].sum()

    if total <= 0:
        raise ValueError("Total passenger count must be greater than zero.")

    df["weight"] = df["passengers"] / total

    return df
