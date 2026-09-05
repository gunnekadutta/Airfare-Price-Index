from fastapi import FastAPI

from api.routes import (
    index,
    fares,
    routes,
    airlines,
    analytics
)


app = FastAPI(
    title="Real-Time Airfare Price Index",
    version="0.1.0"
)

app.include_router(
    index.router,
    prefix="/api/v1/index",
    tags=["Index"]
)

app.include_router(
    fares.router,
    prefix="/api/v1/fares",
    tags=["Fares"]
)

app.include_router(
    routes.router,
    prefix="/api/v1/routes",
    tags=["Routes"]
)

app.include_router(
    airlines.router,
    prefix="/api/v1/airlines",
    tags=["Airlines"]
)

app.include_router(
    analytics.router,
    prefix="/api/v1/analytics",
    tags=["Analytics"]
)


@app.get("/")
def root():
    return {
        "project": "Real-Time Airfare Price Index",
        "status": "running"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
