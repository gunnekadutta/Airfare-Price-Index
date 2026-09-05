from datetime import date


class FareCollector:

    def __init__(self, scrapers=None):
        self.scrapers = scrapers or []

    def collect(self, origin, destination, travel_date=None):
        travel_date = travel_date or date.today()

        results = []

        for scraper in self.scrapers:
            fares = scraper.fetch_fares(
                origin,
                destination,
                travel_date
            )
            results.extend(fares)

        return results
