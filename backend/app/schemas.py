from pydantic import BaseModel


class UserBase(BaseModel):
    """
    Base schema for user data containing common fields.
    This class defines the fundamental structure for user-related data transfer objects,
    including basic user information such as name, email, and description.
    Attributes:
        name (str): The user's full name or display name.
        email (str): The user's email address for contact and identification.
        description (str): A text description or bio for the user.
    """

    name: str
    email: str
    description: str


class UserCreate(UserBase):
    """
    Schema for creating a new user.
    This class extends the UserBase schema to include only the fields required for user creation.
    """

    pass


class User(UserBase):
    """
    Schema for representing an existing user.
    This class extends the UserBase schema to include the user's unique identifier.
    """

    id: int

    class Config:
        from_attributes = True
