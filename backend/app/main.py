from fastapi import FastAPI
from .database import engine, Base
from .routes import users
from . import models

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(users.router)
