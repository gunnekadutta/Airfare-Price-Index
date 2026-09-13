from datetime import date

from pydantic import BaseModel


class Fare(BaseModel):
    id: int
    origin: str
    destination: str
    airline: str
    fare: float
    travel_date: date
    search_date: date
    booking_window: int


# Keep this because other existing API routes use it.
class FareResponse(BaseModel):
    id: str
    origin: str
    destination: str
    airline: str
    travel_date: date
    cabin_class: str
    base_fare: float
    tax_amount: float
    total_fare: float
    currency: str