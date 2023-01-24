from db.base_class import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime


class Post(Base):
    """
    id: Used as a primary key to identify the post
    category: Used to store the post's category
    title: Used to store the post's title
    timestamp: Used to store the date, and time post was created
    author_id: Used to store the ID of the post's author
    author: Establishes a relationship between the post and its author
    """

    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    category = Column(String, nullable=False)
    title = Column(String, nullable=False)
    timestamp = Column(DateTime, nullable=False)
    author_id = Column(Integer, ForeignKey('users.id'))
    author = relationship('User', back_populates='posts')

    def __init__(self, category: str, title: str, timestamp: datetime, author_id: int):
        self.category = category
        self.title = title
        self.timestamp = timestamp
        self.author_id = author_id

