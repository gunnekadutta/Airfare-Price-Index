from fastapi import APIRouter, HTTPException
from api.schemas.airline import AirlineResponse

router = APIRouter()


airlines = [
    {
        "id": "1",
        "code": "AI",
        "name": "Air India"
    },
    {
        "id": "2",
        "code": "6E",
        "name": "IndiGo"
    }
]


@router.get("/airlines", response_model=list[AirlineResponse])
def get_airlines():
    return airlines


@router.get("/airlines/{airline_id}", response_model=AirlineResponse)
def get_airline(airline_id: str):

    for airline in airlines:
        if airline["id"] == airline_id:
            return airline

    raise HTTPException(
        status_code=404,
        detail="Airline not found"
    )