from typing import Optional, Sequence
from sqlalchemy import exc
from sqlalchemy.orm import Session
from . import models, schemas


def get_users(db: Session, skip: int = 0, limit: int = 100) -> Sequence[models.User]:
    """Return users with pagination."""
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    """Create and return a new user."""
    db_user = models.User(name=user.name, email=user.email, description=user.description)
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except exc.SQLAlchemyError:
        db.rollback()
        raise


def delete_user(db: Session, user_id: int) -> Optional[models.User]:
    """Delete a user by ID and return it, or None if not found."""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        try:
            db.delete(user)
            db.commit()
        except exc.SQLAlchemyError:
            db.rollback()
            raise
    return user


def update_user(db: Session, user_id: int, user_data: schemas.UserCreate) -> Optional[models.User]:
    """Update a user by ID and return it, or None if not found."""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        return None
    user.name = user_data.name
    user.email = user_data.email
    user.description = user_data.description
    try:
        db.commit()
        db.refresh(user)
        return user
    except exc.SQLAlchemyError:
        db.rollback()
        raise
