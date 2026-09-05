from analytics.anomaly_detection import detect_zscore_anomalies


def test_anomaly_detection():

    result = detect_zscore_anomalies(
        [100, 101, 99, 100, 500]
    )

    assert len(result) == 5
