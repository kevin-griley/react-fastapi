from fastapi import FastAPI
from router.api_router import api_router
from starlette.middleware.cors import CORSMiddleware
from core.config import settings

from fastapi import Request, Response

from db.session import SessionLocal, engine
from db.base import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(api_router, prefix=settings.API_STR)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_methods=["*"],
        allow_headers=["*"],
    )
