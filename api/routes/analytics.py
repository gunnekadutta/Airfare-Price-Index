from fastapi import APIRouter

router = APIRouter()


@router.get("/anomalies")
def anomalies():
    return []


@router.get("/forecast")
def forecast():
    return {
        "status": "not_implemented"
    }
