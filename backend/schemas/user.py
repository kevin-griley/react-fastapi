from typing import Optional
from pydantic import BaseModel, EmailStr
import schemas


class UserBase(BaseModel):
    email: EmailStr
    name: str 
    description: str
    is_pending: Optional[bool] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None


class UserCreate(UserBase):
    password: str
    name: str 
    description: str
    email: EmailStr


class UserUpdate(UserBase):
    name: Optional[str] = None
    password: Optional[str] = None
    description: Optional[str] = None
    is_superuser: Optional[bool] = None


class UserInDBBase(UserBase):
    id: Optional[int] = None
    class Config:
        orm_mode = True


class User(UserInDBBase):
    items: list[schemas.Item] = []


class UserInDB(UserInDBBase):
    hashed_password: str
