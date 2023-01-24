from typing import Any
from sqlalchemy.ext.declarative import declared_attr, as_declarative
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

# @as_declarative()
# class Base:
#     __abstract__ = True
#     id: Any

#     __name__: str
#     @declared_attr
#     def __tablename__(cls) -> str:
#         return cls.__name__.lower()
