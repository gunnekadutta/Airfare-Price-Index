import pandas as pd

from processing.cleaning.fare_cleaner import clean_fares


def test_clean_fares():

    data = pd.DataFrame({
        "origin": ["DEL", "DEL"],
        "destination": ["BOM", "BLR"],
        "airline": ["IndiGo", "Air India"],
        "fare": [5000, None]
    })

    result = clean_fares(data)

    assert len(result) == 1
