def average_airline_fares(records):
    results = {}

    for record in records:
        airline = record["airline"]
        fare = float(record["fare"])

        results.setdefault(airline, []).append(fare)

    return {
        airline: sum(fares) / len(fares)
        for airline, fares in results.items()
    }
