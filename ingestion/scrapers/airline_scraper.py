from .base_scraper import BaseScraper


class AirlineScraper(BaseScraper):

    def fetch_fares(self, origin, destination, travel_date):
        # Implement airline-specific scraping here.
        return []
