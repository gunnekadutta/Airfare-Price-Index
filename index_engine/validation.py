"""
Validation utilities for the Airfare Price Index.

This module validates fare observations using the data schema
currently stored by the project database.
"""

import pandas as pd

from index_engine.basket import is_valid_route


REQUIRED_COLUMNS = [
    "origin",
    "destination",
    "travel_date",
    "fare",
]


def validate_columns(df: pd.DataFrame) -> None:
    """
    Check that all required columns are present.
    """

    missing_columns = [
        column
        for column in REQUIRED_COLUMNS
        if column not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Missing required columns: {missing_columns}"
        )


def validate_routes(df: pd.DataFrame) -> None:
    """
    Check that every origin-destination route belongs
    to the fixed index basket.
    """

    routes = (
        df["origin"].astype(str).str.upper().str.strip()
        + "-"
        + df["destination"].astype(str).str.upper().str.strip()
    )

    invalid_routes = [
        route
        for route in routes.unique()
        if not is_valid_route(route)
    ]

    if invalid_routes:
        raise ValueError(
            f"Routes outside the fixed basket found: {invalid_routes}"
        )


def validate_fares(df: pd.DataFrame) -> None:
    """
    Check that fares are numeric and greater than zero.
    """

    fares = pd.to_numeric(
        df["fare"],
        errors="coerce",
    )

    invalid_fares = fares.isna() | (fares <= 0)

    if invalid_fares.any():
        raise ValueError(
            "Invalid fare values found. "
            "Fares must be numeric and greater than zero."
        )


def validate_dates(df: pd.DataFrame) -> None:
    """
    Check that travel dates are valid.
    """

    dates = pd.to_datetime(
        df["travel_date"],
        errors="coerce",
    )

    if dates.isna().any():
        raise ValueError(
            "Invalid travel_date values found."
        )


def validate_fare_data(df: pd.DataFrame) -> bool:
    """
    Run all validation checks on fare observations.

    Returns:
        True if all observations pass validation.
    """

    if not isinstance(df, pd.DataFrame):
        raise TypeError(
            "Fare data must be a pandas DataFrame."
        )

    if df.empty:
        raise ValueError(
            "Fare data cannot be empty."
        )

    validate_columns(df)
    validate_routes(df)
    validate_fares(df)
    validate_dates(df)

    return True