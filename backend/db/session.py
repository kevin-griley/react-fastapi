from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Set Up SQLAlchemy Database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

# Initialize SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a Session Local instance
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
