import pandas as pd


def transform_fares(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    df["fare"] = pd.to_numeric(
        df["fare"],
        errors="coerce"
    )

    return df.dropna(subset=["fare"])
