def normalize_currency(amount, currency="INR"):
    """
    Current implementation assumes INR.
    Extend this function if multi-currency sources are introduced.
    """
    if currency != "INR":
        raise ValueError("Only INR is currently supported.")

    return float(amount)
