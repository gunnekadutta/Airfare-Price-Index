from datetime import date, datetime

from sqlalchemy import Date, DateTime, Float, Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class FareObservation(Base):
    __tablename__ = "fare_observations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    origin: Mapped[str] = mapped_column(String(10), nullable=False)
    destination: Mapped[str] = mapped_column(String(10), nullable=False)
    airline: Mapped[str] = mapped_column(String(100), nullable=False)

    fare: Mapped[float] = mapped_column(Float, nullable=False)

    travel_date: Mapped[date] = mapped_column(Date, nullable=False)
    search_date: Mapped[date] = mapped_column(Date, nullable=False)

    booking_window: Mapped[int] = mapped_column(Integer, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )