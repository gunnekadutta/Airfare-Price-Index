from pydantic import BaseModel


class PercentageChange(BaseModel):
    current: float
    previous: float
    change_percent: float
