from processing.normalization.currency import normalize_currency


def test_currency():

    assert normalize_currency(5000, "INR") == 5000
