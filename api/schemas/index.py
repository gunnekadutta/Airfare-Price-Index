from pydantic import BaseModel


class IndexResponse(BaseModel):
    route: str
    period: str
    value: float
