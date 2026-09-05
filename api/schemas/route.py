from pydantic import BaseModel


class Route(BaseModel):
    origin: str
    destination: str
