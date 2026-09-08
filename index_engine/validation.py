"""
Validation utilities for the Airfare Price Index.

This module validates raw fare observations before they enter
the aggregation and index-calculation pipeline.
"""

import pandas as pd

from index_engine.basket import is_valid_route


REQUIRED_COLUMNS = [
    "observation_id",
    "collected_at",
    "travel_date",
    "origin",
    "destination",
    "route",
    "airline",
    "flight_number",
    "departure_time",
    "fare_displayed",
    "currency",
    "fare_type",
    "source",
    "is_round_trip",
]


def validate_columns(df: pd.DataFrame) -> None:
    """
    Check that all required columns are present.
    """
    missing_columns = [
        column for column in REQUIRED_COLUMNS
        if column not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Missing required columns: {missing_columns}"
        )


def validate_routes(df: pd.DataFrame) -> None:
    """
    Check that every route belongs to the fixed route basket.
    """
    invalid_routes = [
        route
        for route in df["route"].dropna().unique()
        if not is_valid_route(route)
    ]

    if invalid_routes:
        raise ValueError(
            f"Routes outside the fixed basket found: {invalid_routes}"
        )


def validate_fares(df: pd.DataFrame) -> None:
    """
    Check that displayed fares are numeric and greater than zero.
    """
    fares = pd.to_numeric(
        df["fare_displayed"],
        errors="coerce"
    )

    invalid_fares = fares.isna() | (fares <= 0)

    if invalid_fares.any():
        raise ValueError(
            "Invalid fare_displayed values found. "
            "Fares must be numeric and greater than zero."
        )


def validate_currency(df: pd.DataFrame) -> None:
    """
    Check that fares are recorded in INR.
    """
    invalid_currency = (
        df["currency"]
        .astype(str)
        .str.upper()
        .str.strip()
        != "INR"
    )

    if invalid_currency.any():
        raise ValueError(
            "Non-INR fare observations found."
        )


def validate_dates(df: pd.DataFrame) -> None:
    """
    Check that travel dates are valid.
    """
    dates = pd.to_datetime(
        df["travel_date"],
        errors="coerce"
    )

    if dates.isna().any():
        raise ValueError(
            "Invalid travel_date values found."
        )


def validate_observation_ids(df: pd.DataFrame) -> None:
    """
    Check that observation IDs exist and are unique.
    """
    if df["observation_id"].isna().any():
        raise ValueError(
            "Missing observation_id values found."
        )

    if df["observation_id"].duplicated().any():
        raise ValueError(
            "Duplicate observation_id values found."
        )


def validate_round_trip(df: pd.DataFrame) -> None:
    """
    The current index uses one-way fares only.
    """
    invalid_round_trip = df["is_round_trip"] != False

    if invalid_round_trip.any():
        raise ValueError(
            "Round-trip observations are not allowed. "
            "The index currently uses one-way fares."
        )


def validate_fare_data(df: pd.DataFrame) -> bool:
    """
    Run all validation checks on fare observations.

    Returns:
        True if all observations pass validation.
    """
    if not isinstance(df, pd.DataFrame):
        raise TypeError("Fare data must be a pandas DataFrame.")

    if df.empty:
        raise ValueError("Fare data cannot be empty.")

    validate_columns(df)
    validate_routes(df)
    validate_fares(df)
    validate_currency(df)
    validate_dates(df)
    validate_observation_ids(df)
    validate_round_trip(df)

    return True
