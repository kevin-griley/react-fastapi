from typing import List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sqlalchemy import func

from crud.base import CRUDBase
from models.post import Post
from schemas.post import PostCreate, PostUpdate
from sqlalchemy.sql.sqltypes import DateTime


class CRUDPost(CRUDBase[Post, PostCreate, PostUpdate]):
    

    def create(self, db: Session, *, obj_in: PostCreate) -> Post:
        db_obj = Post(
            title=obj_in.title,
            author_id=obj_in.author_id,
            timestamp=obj_in.timestamp,
            category=obj_in.category)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_author(self, db: Session, *, author_id: int, skip: int = 0, limit: int = 100 ) -> List[Post]:
        return (
            db.query(self.model)
            .filter(Post.author_id == author_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    

    def get_count(self, db: Session,) -> int:
        return (
            db.query(
                func.count(Post.id)
            )
            .scalar()
        )
    
post = CRUDPost(Post)