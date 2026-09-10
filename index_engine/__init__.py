"""
Airfare Price Index Engine.

Provides the core components used to validate fare data,
aggregate route prices, apply route weights, and calculate
the Laspeyres-style Airfare Price Index.
"""

from index_engine.basket import ROUTE_BASKET
from index_engine.calculator import calculate_index
from index_engine.laspeyres import (
    calculate_overall_index,
    calculate_route_contributions,
    calculate_route_index,
)
from index_engine.weights import get_default_weights

__all__ = [
    "ROUTE_BASKET",
    "calculate_index",
    "calculate_overall_index",
    "calculate_route_contributions",
    "calculate_route_index",
    "get_default_weights",
]
