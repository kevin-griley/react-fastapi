from db.base_class import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship


class User(Base):
    """
    id: Used as a primary key to identify the user
    email: Used to store the user's email address
    hashed_password: Used to store the user's hashed password
    is_active: Used to keep track of if the user is active
    is_superuser: Used to keep track of if the user is a superuser
    is_pending: Used to keep track of if the user is pending
    name: Used to store the user's name
    description: Used to store the user's description
    items: Establishes a relationship between the user and items they own
    posts: Establishes a relationship between the user and posts they author
    """

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    is_pending = Column(Boolean, default=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)

    items = relationship("Item", back_populates="owner")
    posts = relationship('Post', back_populates='author')

    def __init__(self, email: str, hashed_password: str, name: str, description: str):
        self.email = email
        self.hashed_password = hashed_password
        self.name = name
        self.description = description
        
        
