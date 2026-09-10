"""
Fare aggregation utilities for the Airfare Price Index.

This module converts multiple fare observations for the same
route and travel date into one representative fare.

The median is used to reduce the effect of unusually high or
low fare observations.
"""

import pandas as pd


def calculate_route_median(
    df: pd.DataFrame,
) -> pd.DataFrame:
    """
    Calculate the median displayed fare for each route and travel date.

    Expected columns:
        route
        travel_date
        fare_displayed

    Returns:
        DataFrame containing one representative fare per
        route and travel date.
    """

    required_columns = [
        "route",
        "travel_date",
        "fare_displayed",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Missing required columns: {missing_columns}"
        )

    if df.empty:
        raise ValueError(
            "Fare data cannot be empty."
        )

    result = df.copy()

    result["fare_displayed"] = pd.to_numeric(
        result["fare_displayed"],
        errors="coerce",
    )

    result["travel_date"] = pd.to_datetime(
        result["travel_date"],
        errors="coerce",
    )

    result = result.dropna(
        subset=[
            "route",
            "travel_date",
            "fare_displayed",
        ]
    )

    if result.empty:
        raise ValueError(
            "No valid fare observations remain after cleaning."
        )

    aggregated = (
        result
        .groupby(
            ["route", "travel_date"],
            as_index=False
        )["fare_displayed"]
        .median()
        .rename(
            columns={
                "fare_displayed": "representative_fare"
            }
        )
    )

    return aggregated
