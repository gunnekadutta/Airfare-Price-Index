import pandas as pd


def calculate_laspeyres(
    current_prices: pd.Series,
    base_prices: pd.Series,
    weights: pd.Series,
    base_index: float = 100.0
):
    """
    Calculate a Laspeyres-style price index.

    Formula:

        Index =
        [sum(weight_i * current_price_i / base_price_i)] * base_index
    """

    relatives = current_prices / base_prices

    return float(
        (relatives * weights).sum() * base_index
    )
