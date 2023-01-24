from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel

import schemas


class PostBase(BaseModel):
    """This is the base model of posts"""
    title: str
    timestamp: datetime
    category: str


class PostCreate(PostBase):
    """This model is used to create posts"""
    author_id: int


class PostUpdate(PostBase):
    """This model is used to update posts"""
    title: Optional[str]


class Post(PostBase):
    """This is the core model of a post"""
    id: int 
    author_id: int
    author: schemas.User

    class Config:
        orm_mode = True


class PaginatedPosts(BaseModel):
    """This model is used to paginate posts"""
    data: list[Post]
    total: int