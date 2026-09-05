def percentage_change(current, previous):
    if previous == 0:
        return None

    return ((current - previous) / previous) * 100
