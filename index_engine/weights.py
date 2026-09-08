"""
Route weights for the Airfare Price Index.

For the MVP, routes use equal weights because final passenger-
traffic-based weights have not yet been supplied.

The weighting system is designed so that official traffic-based
weights can be introduced later without changing the index engine.
"""

from index_engine.basket import ROUTE_BASKET


def equal_weights() -> dict[str, float]:
    """
    Generate equal weights for every route in the basket.

    Returns
    -------
    dict[str, float]
        Mapping of route -> weight.

    Example
    -------
    {
        "DEL-BOM": 0.04,
        "DEL-BLR": 0.04,
        ...
    }
    """
    number_of_routes = len(ROUTE_BASKET)

    if number_of_routes == 0:
        raise ValueError("Route basket cannot be empty.")

    weight = 1.0 / number_of_routes

    return {
        route: weight
        for route in ROUTE_BASKET
    }


def validate_weights(weights: dict[str, float]) -> bool:
    """
    Validate a route-weight dictionary.

    Checks:
    - Every basket route has a weight.
    - No extra routes are present.
    - Weights are non-negative.
    - Weights sum approximately to 1.

    Parameters
    ----------
    weights : dict[str, float]
        Mapping of route -> weight.

    Returns
    -------
    bool
        True if the weights are valid.

    Raises
    ------
    ValueError
        If the weights fail validation.
    """

    basket_routes = set(ROUTE_BASKET)
    supplied_routes = set(weights.keys())

    missing_routes = basket_routes - supplied_routes
    extra_routes = supplied_routes - basket_routes

    if missing_routes:
        raise ValueError(
            f"Missing weights for routes: {sorted(missing_routes)}"
        )

    if extra_routes:
        raise ValueError(
            f"Weights supplied for routes outside the basket: "
            f"{sorted(extra_routes)}"
        )

    for route, weight in weights.items():
        if not isinstance(weight, (int, float)):
            raise ValueError(
                f"Weight for {route} must be numeric."
            )

        if weight < 0:
            raise ValueError(
                f"Weight for {route} cannot be negative."
            )

    total_weight = sum(weights.values())

    if abs(total_weight - 1.0) > 1e-9:
        raise ValueError(
            f"Weights must sum to 1. Current sum: {total_weight}"
        )

    return True


def get_default_weights() -> dict[str, float]:
    """
    Return the current MVP weights.

    The MVP uses equal weights. This function provides a single
    interface that can later be changed to passenger-traffic-based
    weights.
    """
    weights = equal_weights()
    validate_weights(weights)

    return weights
