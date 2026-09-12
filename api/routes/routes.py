from fastapi import APIRouter
from api.schemas.route import Route

router = APIRouter()


routes_data = [
    {
        "id": "1",
        "origin": "DEL",
        "destination": "BLR",
        "airline": "AI"
    },
    {
        "id": "2",
        "origin": "DEL",
        "destination": "BOM",
        "airline": "6E"
    }
]


@router.get("/routes", response_model=list[Route])
def get_routes(
    origin: str | None = None,
    destination: str | None = None,
    airline: str | None = None
):

    result = routes_data

    if origin:
        result = [
            route for route in result
            if route["origin"] == origin
        ]

    if destination:
        result = [
            route for route in result
            if route["destination"] == destination
        ]

    if airline:
        result = [
            route for route in result
            if route["airline"] == airline
        ]

    return result