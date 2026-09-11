from datetime import date
from pydantic import BaseModel


class Fare(BaseModel):
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


