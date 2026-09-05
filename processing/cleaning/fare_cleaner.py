import pandas as pd


def clean_fares(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    required_columns = [
        "origin",
        "destination",
        "airline",
        "fare"
    ]

    df = df.dropna(subset=required_columns)
    df = df[df["fare"] > 0]

    return df.reset_index(drop=True)
