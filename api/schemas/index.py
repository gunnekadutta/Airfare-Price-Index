from pydantic import BaseModel


class IndexResponse(BaseModel):
    value: float
