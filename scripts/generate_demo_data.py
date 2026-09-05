import pandas as pd


data = pd.DataFrame([
    {
        "origin": "DEL",
        "destination": "BOM",
        "airline": "IndiGo",
        "fare": 5500
    },
    {
        "origin": "DEL",
        "destination": "BLR",
        "airline": "Air India",
        "fare": 6200
    }
])

data.to_csv(
    "data/sample/sample_fares.csv",
    index=False
)

print("Demo data generated.")
