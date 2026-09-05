def validate_weights(weights):
    total = sum(weights)

    return abs(total - 1.0) < 1e-6
