from datetime import date

from pydantic import BaseModel


class IndexResponse(BaseModel):
    index: float
    travel_date: date
    route_indices: dict[str, float]
    route_contributions: dict[str, float]
    available_routes: list[str]
    missing_routes: list[str]
    coverage: float
    current_prices: dict[str, float]
    total_observations: int