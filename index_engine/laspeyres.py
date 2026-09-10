"""
Laspeyres-style Airfare Price Index calculation.

The index compares current route fares with their base-period
fares and applies route weights.

Route index:
    I_r,t = (P_r,t / P_r,0) * 100

Overall index:
    API_t = Σ [w_r * I_r,t]
"""

from typing import Dict


def calculate_route_index(
    current_price: float,
    base_price: float,
) -> float:
    """
    Calculate the price index for one route.

    Formula:
        (current_price / base_price) * 100
    """

    if base_price <= 0:
        raise ValueError(
            "Base price must be greater than zero."
        )

    if current_price <= 0:
        raise ValueError(
            "Current price must be greater than zero."
        )

    return (current_price / base_price) * 100


def calculate_overall_index(
    current_prices: Dict[str, float],
    base_prices: Dict[str, float],
    weights: Dict[str, float],
) -> float:
    """
    Calculate the weighted overall Airfare Price Index.

    Routes missing from current_prices are excluded and the
    remaining route weights are renormalized.

    Args:
        current_prices: Current representative fare by route.
        base_prices: Base-period fare by route.
        weights: Route weights summing to 1.

    Returns:
        Overall Airfare Price Index.
    """

    available_routes = [
        route
        for route in current_prices
        if route in base_prices and route in weights
    ]

    if not available_routes:
        raise ValueError(
            "No routes have both current and base prices."
        )

    available_weight = sum(
        weights[route]
        for route in available_routes
    )

    if available_weight <= 0:
        raise ValueError(
            "Available route weights must be greater than zero."
        )

    index = 0.0

    for route in available_routes:
        route_index = calculate_route_index(
            current_prices[route],
            base_prices[route],
        )

        normalized_weight = (
            weights[route] / available_weight
        )

        index += normalized_weight * route_index

    return index


def calculate_route_contributions(
    current_prices: Dict[str, float],
    base_prices: Dict[str, float],
    weights: Dict[str, float],
) -> Dict[str, float]:
    """
    Calculate each route's contribution to index movement
    relative to the base index of 100.

    Formula:
        contribution = normalized_weight * (route_index - 100)
    """

    available_routes = [
        route
        for route in current_prices
        if route in base_prices and route in weights
    ]

    if not available_routes:
        raise ValueError(
            "No routes have both current and base prices."
        )

    available_weight = sum(
        weights[route]
        for route in available_routes
    )

    if available_weight <= 0:
        raise ValueError(
            "Available route weights must be greater than zero."
        )

    contributions = {}

    for route in available_routes:
        route_index = calculate_route_index(
            current_prices[route],
            base_prices[route],
        )

        normalized_weight = (
            weights[route] / available_weight
        )

        contributions[route] = (
            normalized_weight * (route_index - 100)
        )

    return contributions
