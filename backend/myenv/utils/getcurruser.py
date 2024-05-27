from typing import Annotated
import jwt
from pydantic import BaseModel
from fastapi import Depends,HTTPException,status
from fastapi.security import OAuth2PasswordBearer

class TokenData(BaseModel):
    username: str | None = None

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        idx: int = payload.get("id")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except :
        raise credentials_exception
    if username is None:
        raise credentials_exception
    print(idx)
    return {"username":username,"id":idx}