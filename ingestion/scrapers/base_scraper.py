from abc import ABC, abstractmethod


class BaseScraper(ABC):

    @abstractmethod
    def fetch_fares(self, origin, destination, travel_date):
        """Fetch airfare data for a route."""
        raise NotImplementedError
