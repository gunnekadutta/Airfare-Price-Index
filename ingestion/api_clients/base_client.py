from abc import ABC, abstractmethod


class BaseAPIClient(ABC):

    @abstractmethod
    def get_fares(self, origin, destination, travel_date):
        raise NotImplementedError
