import pandas as pd

from index_engine.laspeyres import calculate_laspeyres


def test_laspeyres():
    current = pd.Series([120, 150])
    base = pd.Series([100, 100])
    weights = pd.Series([0.5, 0.5])

    result = calculate_laspeyres(
        current,
        base,
        weights
    )

    assert result == 135
