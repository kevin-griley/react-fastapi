from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose.exceptions import JWTError
from pydantic import ValidationError
from sqlalchemy.orm import Session

import core.security as security
from core.config import settings

import crud, models, schemas

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_STR}/login/access-token"
)

def get_db(request: Request):
    return request.state.db


def get_current_user( db: Session = Depends(get_db), token: str = Depends(reusable_oauth2) ) -> models.User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.SECURITY_ALGORITHM]
        )
        token_data = schemas.token.TokenPayload(**payload)

    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    
    if not token_data.sub:
        raise HTTPException( status_code=status.HTTP_403_FORBIDDEN, detail="Could not validate credentials", )
    
    user = crud.user.get(db, id=token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user


def get_current_active_user( current_user: models.User = Depends(get_current_user) ) -> models.User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


def get_current_active_superuser( current_user: models.User = Depends(get_current_user) ) -> models.User:
    if not current_user.is_superuser:
        raise HTTPException( status_code=400, detail="The user doesn't have enough privileges" )
    return current_user
