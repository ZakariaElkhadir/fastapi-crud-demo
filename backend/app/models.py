from sqlalchemy import Column, Integer, String
from .database import Base


class User(Base):
    """
    User model representing a user entity in the database.

    This SQLAlchemy model defines the structure for the users table,
    containing basic user information including identification, contact,
    and descriptive details.

    Attributes:
        id (int): Primary key identifier for the user, auto-incrementing.
        name (str): Full name of the user, required field.
        email (str): Email address of the user, must be unique and is indexed for performance.
        description (str, optional): Additional description or bio information about the user.
    """
    """" """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    description = Column(String, nullable=True)
