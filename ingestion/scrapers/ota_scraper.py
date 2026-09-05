from .base_scraper import BaseScraper


class OTAScraper(BaseScraper):

    def fetch_fares(self, origin, destination, travel_date):
        # Implement OTA-specific scraping here.
        return []
