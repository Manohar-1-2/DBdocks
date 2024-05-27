from fastapi import Depends,HTTPException,status
from fastapi.security import  OAuth2PasswordRequestForm
from datetime import  timedelta
from pydantic import BaseModel
from typing import Annotated
from sqlalchemy.orm import Session
from utils.createtoken import authenticate_user,create_access_token


class Token(BaseModel):
    access_token: str
    token_type: str


ACCESS_TOKEN_EXPIRE_MINUTES = 30

async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],db
) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.name,"id":user.id}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
