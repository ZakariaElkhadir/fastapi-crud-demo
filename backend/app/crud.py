from sqlalchemy.orm import Session
from . import models, schemas


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name, email=user.email, description=user.description)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user


def update_user(db: Session, user_id: int, user_data: schemas.UserCreate):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        user.name = user_data.name
        user.email = user_data.email
        user.description = user_data.description
        db.commit()
        db.refresh(user)
    return user
