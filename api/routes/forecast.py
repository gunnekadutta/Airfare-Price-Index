from fastapi import APIRouter
from api.schemas.fare import FareResponse

router = APIRouter()


# Temporary store.
# Replace this with data coming from M2/database integration.
fares_data: list[dict] = []


@router.get("/fares", response_model=list[FareResponse])
def get_fares(
    origin: str | None = None,
    destination: str | None = None,
    airline: str | None = None,
):
    result = fares_data

    if origin:
        origin = origin.upper()
        result = [
            fare for fare in result
            if fare["origin"] == origin
        ]

    if destination:
        destination = destination.upper()
        result = [
            fare for fare in result
            if fare["destination"] == destination
        ]

    if airline:
        result = [
            fare for fare in result
            if fare["airline"].lower() == airline.lower()
        ]

    return result