from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import crud, models, schemas
from router import deps


router = APIRouter()


@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(deps.get_current_active_user)):
    return current_user


# Create a new user
@router.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(deps.get_db)):
    db_user = crud.user.get_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.user.create(db=db, obj_in=user)


# Get all users
@router.get("/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db)):
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    return users


# Get a specific user
@router.get("/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(deps.get_db)):
    db_user = crud.user.get(db, id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# Create an item for a specific user
@router.post("/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(user_id: int, item: schemas.ItemCreate, db: Session = Depends(deps.get_db)):
    return crud.item.get_multi_by_owner(db=db, owner_id=user_id)
