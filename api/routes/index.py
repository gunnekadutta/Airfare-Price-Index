from datetime import date

import pandas as pd
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from database import get_db
from database.repositories.fare_repository import FareRepository

from api.schemas.index import IndexResponse

from index_engine.base_prices import calculate_base_prices
from index_engine.calculator import calculate_index


router = APIRouter()


@router.get(
    "/index",
    response_model=IndexResponse,
    summary="Calculate Airfare Price Index",
    description="Calculate the Airfare Price Index by comparing current fares with base-period fares.",
)
def get_index(
    travel_date: date = Query(
        ...,
        description="Current-period travel date",
    ),
    base_date: date = Query(
        ...,
        description="Base-period travel date",
    ),
    db: Session = Depends(get_db),
):
    try:
        repository = FareRepository(db)

        current_fares = repository.get_by_travel_date(
            travel_date
        )

        base_fares = repository.get_by_travel_date(
            base_date
        )

        if not current_fares:
            raise HTTPException(
                status_code=404,
                detail="No current-period fare data found for the specified travel date.",
            )

        if not base_fares:
            raise HTTPException(
                status_code=404,
                detail="No base-period fare data found for the specified base date.",
            )

        current_data = pd.DataFrame(
            [
                {
                    "origin": fare.origin,
                    "destination": fare.destination,
                    "travel_date": fare.travel_date,
                    "fare": fare.fare,
                }
                for fare in current_fares
            ]
        )

        base_data = pd.DataFrame(
            [
                {
                    "origin": fare.origin,
                    "destination": fare.destination,
                    "fare": fare.fare,
                }
                for fare in base_fares
            ]
        )

        base_prices = calculate_base_prices(
            base_data
        )

        result = calculate_index(
            current_data=current_data,
            base_prices=base_prices,
        )
        result["total_observations"] = len(current_fares)

        return result

    except HTTPException:
        raise

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Failed to calculate the Airfare Price Index.",
        )