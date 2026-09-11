from fastapi import APIRouter, HTTPException
from api.schemas.airport import AirportResponse

router = APIRouter()

airports = [
    {
        "id": "1",
        "code": "DEL",
        "name": "Indira Gandhi International Airport",
        "city": "Delhi",
        "country": "India"
    },
    {
        "id": "2",
        "code": "BOM",
        "name": "Chhatrapati Shivaji Maharaj International Airport",
        "city": "Mumbai",
        "country": "India"
    },
    {
        "id": "3",
        "code": "BLR",
        "name": "Kempegowda International Airport",
        "city": "Bengaluru",
        "country": "India"
    },
    {
        "id": "4",
        "code": "HYD",
        "name": "Rajiv Gandhi International Airport",
        "city": "Hyderabad",
        "country": "India"
    },
    {
        "id": "5",
        "code": "CCU",
        "name": "Netaji Subhas Chandra Bose International Airport",
        "city": "Kolkata",
        "country": "India"
    },
    {
        "id": "6",
        "code": "MAA",
        "name": "Chennai International Airport",
        "city": "Chennai",
        "country": "India"
    },
    {
        "id": "7",
        "code": "AMD",
        "name": "Sardar Vallabhbhai Patel International Airport",
        "city": "Ahmedabad",
        "country": "India"
    },
    {
        "id": "8",
        "code": "PNQ",
        "name": "Pune Airport",
        "city": "Pune",
        "country": "India"
    },
    {
        "id": "9",
        "code": "GOI",
        "name": "Goa International Airport",
        "city": "Goa",
        "country": "India"
    },
    {
        "id": "10",
        "code": "COK",
        "name": "Cochin International Airport",
        "city": "Kochi",
        "country": "India"
    },
    {
        "id": "11",
        "code": "GAU",
        "name": "Lokpriya Gopinath Bordoloi International Airport",
        "city": "Guwahati",
        "country": "India"
    }
]


@router.get("/airports", response_model=list[AirportResponse])
def get_airports():
    return airports


@router.get("/airports/{airport_id}", response_model=AirportResponse)
def get_airport(airport_id: str):
    for airport in airports:
        if airport["id"] == airport_id:
            return airport

    raise HTTPException(
        status_code=404,
        detail="Airport not found"
    )