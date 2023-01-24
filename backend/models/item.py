from db.base_class import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from typing import Optional


class Item(Base):
    """
    id: Used as a primary key to identify the item
    title: Used to store the item's title
    description: Used to store the item's description 
    owner_id: Used to store the id of the item's owner
    owner: Establishes a relationship between the item and its owner
    """
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="items")


    def __init__(self, title: str, description: str, owner_id: Optional[int]):
        self.title = title
        self.description = description
        self.owner_id = owner_id
