from pydantic import BaseModel


class Fare(BaseModel):
    origin: str
    destination: str
    airline: str
    fare: float
