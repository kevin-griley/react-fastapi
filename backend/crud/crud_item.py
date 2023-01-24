from typing import List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.item import Item
from schemas.item import ItemCreate, ItemUpdate


class CRUDItem(CRUDBase[Item, ItemCreate, ItemUpdate]):


    def get_multi_by_owner(self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100 ) -> List[Item]:
        return (
            db.query(self.model)
            .filter(Item.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


item = CRUDItem(Item)
