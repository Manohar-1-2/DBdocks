from pydantic import BaseModel,Field
class SignUpForm(BaseModel):
    name:str
    email: str
    password: str
    active: bool=True

class DbCreationForm(BaseModel):
    db_name:str
    db_password:str

class DbQueryForm(BaseModel):
    db_id:str
    db_query:str
    