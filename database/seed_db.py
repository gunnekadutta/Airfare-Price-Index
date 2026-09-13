import csv
from datetime import date, datetime
from pathlib import Path

from sqlalchemy.orm import Session

from database.connection import engine
from database.models import FareObservation


CSV_FILE = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "fare_observations_seed.csv"
)


def seed_database():
    if not CSV_FILE.exists():
        raise FileNotFoundError(
            f"Seed CSV file not found: {CSV_FILE}"
        )

    with Session(engine) as session:
        observations = []

        with open(CSV_FILE, "r", newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            for row in reader:
                observation = FareObservation(
                    id=int(row["id"]),
                    origin=row["origin"],
                    destination=row["destination"],
                    airline=row["airline"],
                    fare=float(row["fare"]),
                    travel_date=date.fromisoformat(row["travel_date"]),
                    search_date=date.fromisoformat(row["search_date"]),
                    booking_window=int(row["booking_window"]),
                    created_at=datetime.fromisoformat(
                        row["created_at"]
                    ),
                )

                observations.append(observation)

        session.add_all(observations)
        session.commit()

        print(
            f"Successfully inserted {len(observations)} fare observations."
        )


if __name__ == "__main__":
    seed_database()