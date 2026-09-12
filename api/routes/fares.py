from fastapi import APIRouter
from api.schemas.fare import Fare
from fastapi import HTTPException
from datetime import date

router = APIRouter()

fares_data = [
    {
        "id": "1",
        "origin": "DEL",
        "destination": "BLR",
        "airline": "AI",
        "travel_date": "2026-09-15",
        "cabin_class": "economy",
        "base_fare": 4500,
        "tax_amount": 810,
        "total_fare": 5310,
        "currency": "INR"
    }
]


@router.get("/", response_model=list[Fare],
         summary="Get flight fares",
         description="Retrieve flight fares using route, airline, date and cabin filters."
          )

def get_fares(
    origin: str | None = None,
    destination: str | None = None,
    airline: str | None = None,
    travel_date: date | None = None,
    cabin_class: str | None = None
):

    result = fares_data

    if origin:
        result = [
            fare for fare in result
            if fare["origin"] == origin
        ]

    if destination:
        result = [
            fare for fare in result
            if fare["destination"] == destination
        ]

    if airline:
        result = [
            fare for fare in result
            if fare["airline"] == airline
        ]

    if travel_date:
        result = [
            fare for fare in result
            if fare["travel_date"] == travel_date
        ]

    if cabin_class:
        result = [
            fare for fare in result
            if fare["cabin_class"] == cabin_class
        ]

    return result

@router.get("/fares/{fare_id}", response_model=Fare,
            responses={
            404: {
            "description": "Fare not found"
            }
        }
    )
def get_fare(fare_id: str):

    for fare in fares_data:
        if fare["id"] == fare_id:
            return fare

    raise HTTPException(
        status_code=404,
        detail="Airport not found"
    )