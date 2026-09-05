# Real-Time Airfare Price Index

A statistical data pipeline that continuously collects, normalizes, and analyzes domestic airfare data to generate a CPI-style price index for policy and market monitoring.

## Problem

Domestic airfares can change rapidly due to demand, seasonality, capacity, fuel costs, holidays, and other market factors.

The objective is to convert continuously collected airfare observations into a meaningful statistical indicator.

## Pipeline

Raw Fare Data
    ?
Cleaning
    ?
Normalization
    ?
Weighted Route Basket
    ?
Laspeyres Index
    ?
Analytics
    ?
FastAPI
    ?
Dashboard

## Core Features

- Automated fare collection
- Data cleaning and normalization
- Passenger-based route weighting
- Laspeyres-style price index
- Route-level analysis
- Airline-level analysis
- Historical index tracking
- Anomaly detection
- Forecasting-ready architecture
- REST API

## Running Locally

Install dependencies:

    pip install -r requirements.txt

Start API:

    uvicorn api.main:app --reload

API documentation:

    http://localhost:8000/docs

## Project Structure

    config/
    ingestion/
    processing/
    index_engine/
    analytics/
    database/
    api/
    pipelines/
    tests/
    scripts/
    docs/
    data/

## Methodology

The core index uses a Laspeyres-style formulation:

    Index = S(weight × current_price / base_price) × 100

Route weights initially represent passenger traffic share.

## Status

Initial backend architecture and statistical core for the SIH 2026 project.
