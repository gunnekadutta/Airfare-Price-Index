def validate_fare(fare):
    if fare is None:
        return False

    try:
        return float(fare) > 0
    except (TypeError, ValueError):
        return False
