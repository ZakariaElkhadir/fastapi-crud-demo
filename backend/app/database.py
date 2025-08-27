import os

from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

password = os.getenv("PASSWORD")

# Replace with your actual username, password, host, port, and database name
DATABASE_URL = f"postgresql://postgres:{password}@localhost/mini_project"

# SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    echo=True  # prints SQL queries, optional for debugging
)

# SessionLocal class used to create database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to use in FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
