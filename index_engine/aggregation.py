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
    Calculate the median fare for each route and travel date.

    Expected columns:
        origin
        destination
        travel_date
        fare

    Returns:
        DataFrame containing one representative fare per
        route and travel date.
    """

    required_columns = [
        "origin",
        "destination",
        "travel_date",
        "fare",
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

    # ---------------------------------------------------------
    # Build route from origin and destination
    # ---------------------------------------------------------

    result["route"] = (
        result["origin"].astype(str).str.upper().str.strip()
        + "-"
        + result["destination"].astype(str).str.upper().str.strip()
    )

    # ---------------------------------------------------------
    # Convert fare and travel date to usable formats
    # ---------------------------------------------------------

    result["fare"] = pd.to_numeric(
        result["fare"],
        errors="coerce",
    )

    result["travel_date"] = pd.to_datetime(
        result["travel_date"],
        errors="coerce",
    )

    # ---------------------------------------------------------
    # Remove invalid observations
    # ---------------------------------------------------------

    result = result.dropna(
        subset=[
            "route",
            "travel_date",
            "fare",
        ]
    )

    result = result[result["fare"] > 0]

    if result.empty:
        raise ValueError(
            "No valid fare observations remain after cleaning."
        )

    # ---------------------------------------------------------
    # Calculate median fare for each route and travel date
    # ---------------------------------------------------------

    aggregated = (
        result
        .groupby(
            ["route", "travel_date"],
            as_index=False,
        )["fare"]
        .median()
        .rename(
            columns={
                "fare": "representative_fare"
            }
        )
    )

    return aggregated