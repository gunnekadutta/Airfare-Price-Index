import numpy as np


def detect_zscore_anomalies(values, threshold=3):
    values = np.asarray(values, dtype=float)

    mean = values.mean()
    std = values.std()

    if std == 0:
        return np.zeros(len(values), dtype=bool)

    z_scores = np.abs((values - mean) / std)

    return z_scores > threshold
