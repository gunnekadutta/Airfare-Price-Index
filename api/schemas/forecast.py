from datetime import date
from pydantic import BaseModel


class ForecastItem(BaseModel):
    date: date
    predicted_fare: float


class ForecastResponse(BaseModel):
    route: str
    forecast: list[ForecastItem]