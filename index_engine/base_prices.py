"""
Base-period price utilities for the Airfare Price Index.

The base period provides the reference fare for each route.
All subsequent index values are calculated relative to these
base-period fares.
"""

import pandas as pd

from index_engine.basket import ROUTE_BASKET


def calculate_base_prices(
    base_data: pd.DataFrame,
) -> dict[str, float]:
    """
    Calculate representative base-period fares for each route.

    The median fare is used when multiple observations exist
    for the same route.

    Expected columns:
        origin
        destination
        fare

    Returns:
        Dictionary mapping route -> base-period fare.

    Example:
        {
            "DEL-BOM": 5000.0,
            "DEL-BLR": 6200.0
        }
    """

    required_columns = [
        "origin",
        "destination",
        "fare",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in base_data.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Missing required columns: {missing_columns}"
        )

    if base_data.empty:
        raise ValueError(
            "Base-period fare data cannot be empty."
        )

    data = base_data.copy()

    # ---------------------------------------------------------
    # Build route
    # ---------------------------------------------------------

    data["route"] = (
        data["origin"].astype(str).str.upper().str.strip()
        + "-"
        + data["destination"].astype(str).str.upper().str.strip()
    )

    # ---------------------------------------------------------
    # Convert fares to numeric
    # ---------------------------------------------------------

    data["fare"] = pd.to_numeric(
        data["fare"],
        errors="coerce",
    )

    data = data.dropna(
        subset=["route", "fare"]
    )

    data = data[data["fare"] > 0]

    if data.empty:
        raise ValueError(
            "No valid base-period fares remain after cleaning."
        )

    # ---------------------------------------------------------
    # Keep only routes in the fixed basket
    # ---------------------------------------------------------

    data = data[
        data["route"].isin(ROUTE_BASKET)
    ]

    if data.empty:
        raise ValueError(
            "No base-period observations belong to the "
            "fixed route basket."
        )

    # ---------------------------------------------------------
    # Calculate median fare for each route
    # ---------------------------------------------------------

    base_prices = (
        data
        .groupby("route")["fare"]
        .median()
        .to_dict()
    )

    # ---------------------------------------------------------
    # Final validation
    # ---------------------------------------------------------

    for route, price in base_prices.items():

        if price <= 0:
            raise ValueError(
                f"Base price for {route} must be greater than zero."
            )

    return base_prices