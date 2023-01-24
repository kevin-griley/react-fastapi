# Import all the models, so that Base has them before being
# imported by Alembic

from db.base_class import Base  
from models.item import Item  
from models.user import User  
from models.post import Post
