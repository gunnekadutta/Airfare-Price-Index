import pandas as pd

from index_engine.weights import calculate_weights


def test_weights_sum_to_one():

    data = pd.DataFrame({
        "route": ["DEL-BOM", "DEL-BLR"],
        "passengers": [500, 500]
    })

    result = calculate_weights(data)

    assert abs(result["weight"].sum() - 1.0) < 1e-6
