from datetime import date, datetime
import pandas as pd

from database.models import FareObservation
from database.repositories.fare_repository import FareRepository

from processing.cleaning.fare_cleaner import clean_fares
from processing.cleaning.validators import validate_fare
from processing.normalization.currency import normalize_currency
from processing.normalization.booking_window import calculate_booking_window
from processing.transformation.fare_transformer import transform_fares


class FareCollector:

    def __init__(self, scrapers=None, repository=None):
        self.scrapers = scrapers or []
        self.repository = repository

    def collect(self, origin, destination, travel_date=None):

        # -----------------------------
        # 1. Prepare travel date
        # -----------------------------
        if isinstance(travel_date, date):
            scraper_travel_date = travel_date.strftime("%Y-%m-%d")
        else:
            scraper_travel_date = (
                travel_date or date.today().strftime("%Y-%m-%d")
            )

        database_travel_date = datetime.strptime(
            scraper_travel_date,
            "%Y-%m-%d"
        ).date()

        search_date = date.today()

        # -----------------------------
        # 2. Calculate booking window
        # -----------------------------
        booking_window = calculate_booking_window(
            search_date,
            database_travel_date
        )

        results = []

        # -----------------------------
        # 3. Collect raw scraper data
        # -----------------------------
        raw_fares = []

        for scraper in self.scrapers:

            fares = scraper.fetch_fares(
                origin,
                destination,
                scraper_travel_date
            )

            for fare_data in fares:

                raw_price = fare_data.get("Price")

                # Reject invalid prices early
                if not validate_fare(raw_price):
                    print(
                        f"Skipping invalid fare: {raw_price}"
                    )
                    continue

                raw_fares.append({
                    "origin": origin,
                    "destination": destination,
                    "airline": fare_data.get(
                        "Airline",
                        "Unknown"
                    ),
                    "fare": raw_price
                })

        # Nothing to process
        if not raw_fares:
            print("No valid fares collected.")
            return results

        # -----------------------------
        # 4. Convert to DataFrame
        # -----------------------------
        df = pd.DataFrame(raw_fares)

        # -----------------------------
        # 5. Transform fares
        # -----------------------------
        df = transform_fares(df)

        # -----------------------------
        # 6. Clean fares
        # -----------------------------
        df = clean_fares(df)

        # -----------------------------
        # 7. Create database objects
        # -----------------------------
        for _, fare_data in df.iterrows():

            fare_amount = normalize_currency(
                fare_data["fare"],
                "INR"
            )

            fare = FareObservation(
                origin=fare_data["origin"],
                destination=fare_data["destination"],
                airline=fare_data["airline"],
                fare=fare_amount,
                travel_date=database_travel_date,
                search_date=search_date,
                booking_window=booking_window
            )

            results.append(fare)

        # -----------------------------
        # 8. Save all fares at once
        # -----------------------------
        if self.repository and results:
            self.repository.save_many(results)

        return results