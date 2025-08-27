from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from .. import database, crud, schemas

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=list[schemas.User])
def fetch_all_users(db: Session = Depends(database.get_db)):
    return crud.get_users(db)


@router.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    return crud.create_user(db, user)


@router.delete('/{user_id}', response_model=schemas.User)
def delete_user(user_id: int, db: Session = Depends(database.get_db)):
    deleted_user = crud.delete_user(db, user_id)
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User not found")
    return deleted_user

@router.put('/{user_id}', response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    updated_user = crud.update_user(db, user_id, user)

    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user
