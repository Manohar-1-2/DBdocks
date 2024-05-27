from models.crud import getdbinf
from utils.databaseconnecton import get_user_database
from fastapi import HTTPException,status
def connectdb_cont(curruser,db):
    cont=getdbinf(db,curruser)
    try:
        get_user_database(cont[0].password,cont[0].port,"localhost")
        return {}
    except:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Internal error"
        )

