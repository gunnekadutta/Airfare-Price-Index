"""
Route basket for the Airfare Price Index.

The basket is fixed for the MVP and contains 25 high-priority
domestic Indian air routes.

Base-period and route weights are handled separately.
"""

ROUTE_BASKET = [
    "DEL-BOM",
    "DEL-BLR",
    "DEL-HYD",
    "DEL-CCU",
    "DEL-MAA",
    "DEL-AMD",
    "DEL-PNQ",
    "DEL-GOI",
    "DEL-COK",
    "DEL-GAU",
    "BOM-BLR",
    "BOM-HYD",
    "BOM-MAA",
    "BOM-CCU",
    "BOM-AMD",
    "BOM-GOI",
    "BLR-HYD",
    "BLR-MAA",
    "BLR-CCU",
    "BLR-GOI",
    "BLR-COK",
    "HYD-MAA",
    "HYD-CCU",
    "CCU-GAU",
    "MAA-COK",
]

# Number of routes in the basket.
BASKET_SIZE = len(ROUTE_BASKET)


def is_valid_route(route: str) -> bool:
    """
    Check whether a route belongs to the fixed index basket.

    Parameters
    ----------
    route : str
        Route in the format ORIGIN-DESTINATION, e.g. DEL-BOM.

    Returns
    -------
    bool
        True if the route is part of the basket, otherwise False.
    """
    if not isinstance(route, str):
        return False

    return route.upper().strip() in ROUTE_BASKET
