from pydantic import BaseModel


class Route(BaseModel):
    id: str
    origin: str
    destination: str
    airline: str
