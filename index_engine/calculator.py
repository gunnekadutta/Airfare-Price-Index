from .laspeyres import calculate_laspeyres


class IndexCalculator:

    def calculate(
        self,
        current_prices,
        base_prices,
        weights
    ):
        return calculate_laspeyres(
            current_prices=current_prices,
            base_prices=base_prices,
            weights=weights
        )
