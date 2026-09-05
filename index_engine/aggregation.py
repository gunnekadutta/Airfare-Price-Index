def aggregate_route_indices(route_indices):
    if not route_indices:
        return 0

    return sum(route_indices) / len(route_indices)
