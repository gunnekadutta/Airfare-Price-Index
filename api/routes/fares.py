import logging
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from database import get_db
from database.models import FareObservation
from database.repositories.fare_repository import FareRepository

from api.schemas.fare import Fare


logger = logging.getLogger(__name__)

router = APIRouter()


@router.get(
    "/",
    response_model=list[Fare],
    summary="Get flight fares",
    description="Retrieve flight fare observations from the database."
)
def get_fares(
    origin: str | None = None,
    destination: str | None = None,
    airline: str | None = None,
    travel_date: date | None = None,
    skip: int = Query(
        default=0,
        ge=0,
        description="Number of records to skip"
    ),
    limit: int = Query(
        default=100,
        ge=1,
        le=500,
        description="Maximum number of records to return"
    ),
    db: Session = Depends(get_db),
):

    try:
        logger.info(
            "Fetching fares: origin=%s, destination=%s, airline=%s, "
            "travel_date=%s, skip=%s, limit=%s",
            origin,
            destination,
            airline,
            travel_date,
            skip,
            limit,
        )

        repository = FareRepository(db)

        return repository.get_latest(
            origin=origin,
            destination=destination,
            airline=airline,
            travel_date=travel_date,
            skip=skip,
            limit=limit,
        )

    except Exception:
        logger.exception("Failed to fetch fares")
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve fare data."
        )


@router.get(
    "/{fare_id}",
    response_model=Fare,
    responses={404: {"description": "Fare not found"}}
)
def get_fare(
    fare_id: int,
    db: Session = Depends(get_db),
):

    try:
        logger.info("Fetching fare with id=%s", fare_id)

        fare = db.get(FareObservation, fare_id)

        if fare is None:
            logger.warning("Fare not found: id=%s", fare_id)
            raise HTTPException(
                status_code=404,
                detail="Fare not found"
            )

        return fare

    except HTTPException:
        raise

    except Exception:
        logger.exception(
            "Failed to fetch fare with id=%s",
            fare_id
        )
        raise HTTPException(
            status_code=500,
            detail="Failed to retrieve fare data."
        )
