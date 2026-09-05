def route_contribution(route_indices, overall_index):
    return {
        route: value - overall_index
        for route, value in route_indices.items()
    }
