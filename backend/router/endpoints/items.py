from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from router import deps

import crud, models, schemas


router = APIRouter()


# Get all items
@router.get("/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db)):
    items = crud.item.get_multi(db, skip=skip, limit=limit)
    return items