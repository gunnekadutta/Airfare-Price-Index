from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import FareObservation


class FareRepository:

    def __init__(self, db: Session):
        self.db = db

    def save(self, fare: FareObservation) -> FareObservation:
        try:
            self.db.add(fare)
            self.db.commit()
            self.db.refresh(fare)
            return fare
        except Exception:
            self.db.rollback()
            raise

    def save_many(
        self,
        fares: list[FareObservation]
    ) -> list[FareObservation]:

        if not fares:
            return []

        try:
            self.db.add_all(fares)
            self.db.commit()

            for fare in fares:
                self.db.refresh(fare)

            return fares

        except Exception:
            self.db.rollback()
            raise

    def get_latest(
        self,
        origin: str | None = None,
        destination: str | None = None,
        airline: str | None = None,
        travel_date: date | None = None,
        skip: int = 0,
        limit: int = 100,
    ) -> list[FareObservation]:

        statement = select(FareObservation)

        if origin:
            statement = statement.where(
                FareObservation.origin == origin
            )

        if destination:
            statement = statement.where(
                FareObservation.destination == destination
            )

        if airline:
            statement = statement.where(
                FareObservation.airline == airline
            )

        if travel_date:
            statement = statement.where(
                FareObservation.travel_date == travel_date
            )

        statement = (
            statement
            .order_by(FareObservation.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        return list(self.db.scalars(statement).all())

    def get_by_travel_date(
        self,
        travel_date: date,
    ) -> list[FareObservation]:
        """
        Get all fare observations for a specific travel date.
        """

        statement = (
            select(FareObservation)
            .where(
                FareObservation.travel_date == travel_date
            )
            .order_by(FareObservation.created_at.asc())
        )

        return list(
            self.db.scalars(statement).all()
        )