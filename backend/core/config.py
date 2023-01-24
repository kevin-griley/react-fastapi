import secrets
from typing import List
from pydantic import BaseSettings


class Settings(BaseSettings):

    PROJECT_NAME: str = "TruckPlanner"
    API_STR: str = "/api"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    SECURITY_ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 8
    BACKEND_CORS_ORIGINS: List[str] = ['http://localhost:5173']

    class Config:
        case_sensitive = True

settings = Settings()
