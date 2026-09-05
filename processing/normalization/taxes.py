def normalize_tax(total_fare, tax_included=True):
    """
    Return normalized fare.
    """

    if tax_included:
        return float(total_fare)

    return float(total_fare)
