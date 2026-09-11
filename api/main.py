from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import (
    health,
    airports,
    airlines,
    routes,
    fares,
    forecast,
    index,
)


app = FastAPI(
    title="Airfare Price Index API",
    description="Backend API for the Airfare Price Index project",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    health.router,
    prefix="/api/v1",
    tags=["Health"],
)

app.include_router(
    airports.router,
    prefix="/api/v1",
    tags=["Airports"],
)

app.include_router(
    airlines.router,
    prefix="/api/v1",
    tags=["Airlines"],
)

app.include_router(
    routes.router,
    prefix="/api/v1",
    tags=["Routes"],
)

app.include_router(
    fares.router,
    prefix="/api/v1",
    tags=["Fares"],
)

app.include_router(
    forecast.router,
    prefix="/api/v1",
    tags=["Forecast"],
)

app.include_router(
    index.router,
    prefix="/api/v1",
    tags=["Index"],
)


@app.get("/")
def root():
    return {
        "message": "Airfare Price Index API",
        "docs": "/docs",
    }