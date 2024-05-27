import databases
import asyncpg
from fastapi import HTTPException
class UserDatabase:
    def __init__(self, database_url):
        self.database = databases.Database(database_url)

    async def connect(self):
        await self.database.connect()

    async def disconnect(self):
        await self.database.disconnect()

    async def execute_query(self, query):
        try:
            result = await self.database.fetch_all(query)
            return {"result": result}
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

def get_database_url_for_user(password: str, port: int, url: str) -> str:
    database_url = f"postgresql://postgres:{password}@{url}:{port}"
    return database_url
async def get_user_database(password,port,url):
    database_url = get_database_url_for_user(password,port,url)
    user_db = UserDatabase(database_url)
    await user_db.connect()
    return user_db
