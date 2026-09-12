from pydantic import BaseModel


class AirportResponse(BaseModel):
    id: str
    code: str
    name: str
    city: str
    country: str