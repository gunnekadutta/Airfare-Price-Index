from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/index")
def get_index(
    origin: str | None = None,
    destination: str | None = None,
):
    raise HTTPException(
        status_code=501,
        detail="Index engine has not yet been integrated",
    )