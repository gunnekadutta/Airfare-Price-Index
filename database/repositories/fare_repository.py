from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import FareObservation


class FareRepository:
    def __init__(self, db: Session):
        self.db = db

    def save(self, fare: FareObservation) -> FareObservation:
        self.db.add(fare)
        self.db.commit()
        self.db.refresh(fare)
        return fare

    def get_latest(self) -> list[FareObservation]:
        statement = (
            select(FareObservation)
            .order_by(FareObservation.created_at.desc())
        )

        return list(self.db.scalars(statement).all())