from pydantic import BaseModel


class AirlineResponse(BaseModel):
    id: str
    code: str
    name: str