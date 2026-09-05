from fastapi import APIRouter

router = APIRouter()


@router.get("/current")
def current_index():
    return {
        "index": 100.0,
        "status": "demo"
    }


@router.get("/history")
def index_history():
    return []


@router.get("/change")
def index_change():
    return {
        "mom": 0.0,
        "yoy": 0.0
    }
