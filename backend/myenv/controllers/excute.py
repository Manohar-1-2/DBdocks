from utils.databaseconnecton import get_user_database
from models.crud import get_db_inf_by_id
from fastapi import HTTPException,status
async def executeq(curr,db,cont_id,query):
    cont=get_db_inf_by_id(db,curr,cont_id)
    contdb=await get_user_database(cont[0].password,cont[0].port,"localhost")
    r=await contdb.execute_query(query)
    return r
   