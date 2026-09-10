"""
Main calculation pipeline for the Airfare Price Index.

This module connects validation, aggregation, weights, and
Laspeyres calculation into one workflow.
"""

import pandas as pd

from index_engine.aggregation import calculate_route_median
from index_engine.basket import ROUTE_BASKET
from index_engine.laspeyres import (
    calculate_overall_index,
    calculate_route_contributions,
    calculate_route_index,
)
from index_engine.validation import validate_fare_data
from index_engine.weights import get_default_weights


def calculate_index(
    current_data: pd.DataFrame,
    base_prices: dict[str, float],
) -> dict:
    """
    Calculate the Airfare Price Index for a given set of
    current fare observations.

    Args:
        current_data:
            Fare observations for the current period.

        base_prices:
            Representative base-period fare for each route.

    Returns:
        Dictionary containing the overall index, route indices,
        contributions, and coverage information.
    """

    # ---------------------------------------------------------
    # 1. Validate incoming fare data
    # ---------------------------------------------------------

    validate_fare_data(current_data)

    # ---------------------------------------------------------
    # 2. Aggregate observations into route-level prices
    # ---------------------------------------------------------

    aggregated = calculate_route_median(current_data)

    # ---------------------------------------------------------
    # 3. Build current-price dictionary
    # ---------------------------------------------------------

    current_prices = dict(
        zip(
            aggregated["route"],
            aggregated["representative_fare"],
        )
    )

    # ---------------------------------------------------------
    # 4. Get route weights
    # ---------------------------------------------------------

    weights = get_default_weights()

    # ---------------------------------------------------------
    # 5. Identify routes available for calculation
    # ---------------------------------------------------------

    available_routes = [
        route
        for route in ROUTE_BASKET
        if route in current_prices
        and route in base_prices
    ]

    if not available_routes:
        raise ValueError(
            "No basket routes have both current and base prices."
        )

    # ---------------------------------------------------------
    # 6. Calculate overall index
    # ---------------------------------------------------------

    overall_index = calculate_overall_index(
        current_prices=current_prices,
        base_prices=base_prices,
        weights=weights,
    )

    # ---------------------------------------------------------
    # 7. Calculate route-level indices
    # ---------------------------------------------------------

    route_indices = {}

    for route in available_routes:
        route_indices[route] = calculate_route_index(
            current_price=current_prices[route],
            base_price=base_prices[route],
        )

    # ---------------------------------------------------------
    # 8. Calculate route contributions
    # ---------------------------------------------------------

    contributions = calculate_route_contributions(
        current_prices=current_prices,
        base_prices=base_prices,
        weights=weights,
    )

    # ---------------------------------------------------------
    # 9. Calculate basket coverage
    # ---------------------------------------------------------

    available_weight = sum(
        weights[route]
        for route in available_routes
    )

    total_weight = sum(weights.values())

    coverage = available_weight / total_weight

    # ---------------------------------------------------------
    # 10. Return complete result
    # ---------------------------------------------------------

    return {
        "index": overall_index,
        "route_indices": route_indices,
        "route_contributions": contributions,
        "available_routes": available_routes,
        "missing_routes": [
            route
            for route in ROUTE_BASKET
            if route not in available_routes
        ],
        "coverage": coverage,
    }
