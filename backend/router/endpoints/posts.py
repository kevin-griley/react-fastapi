from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import crud, models, schemas
from router import deps
from datetime import datetime

router = APIRouter()


@router.get("/", response_model=schemas.PaginatedPosts)
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db)):
    posts = crud.post.get_multi(db, skip=skip, limit=limit)
    total_posts = crud.post.get_count(db)
    return { 'data': posts, 'total': total_posts }


@router.post("/")
def create_post(post: schemas.PostCreate, db: Session = Depends(deps.get_db)):
    return crud.post.create(db=db, obj_in=post)


@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(deps.get_db)):
    return crud.post.remove(db=db, id=post_id)

