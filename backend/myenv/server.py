
from typing import Annotated
from fastapi import Depends, FastAPI,Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

from controllers.login import login_for_access_token
from controllers.signup import signup
from controllers.createDBContainer import createDBCont
from controllers.getdbinstances import getinstances
from controllers.stopinstance import stopinstance
from controllers.startinstance import startinstance
from controllers.deleteinstance import del_instance
from controllers.connect import connectdb_cont
from controllers.excute import executeq

from forms.forms import SignUpForm
from forms.forms import DbCreationForm
from forms.forms import DbQueryForm
from utils.getcurruser import get_current_user
from models.database import SessionLocal, engine,Base
from sqlalchemy.orm import Session
 
Base.metadata.create_all(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],db: Session = Depends(get_db)):
    return await login_for_access_token(form_data,db)

@app.post("/signin")
async def signin(form_data:Annotated[SignUpForm,Body(embed=True)],db: Session = Depends(get_db)):
    return signup(form_data,db)

@app.post("/createdb")
async def createdb(form_data:Annotated[DbCreationForm,Body(embed=True)],curruser=Depends(get_current_user),db: Session = Depends(get_db)):
    return await createDBCont(form_data,curruser,db)

@app.get("/dbinstances")
async def createdb(curruser=Depends(get_current_user),db: Session = Depends(get_db)):
    return  getinstances(curruser,db)

@app.post("/stopinstance")
async def createdb(cont_id,curruser=Depends(get_current_user),db: Session = Depends(get_db)):
    return  stopinstance(cont_id,curruser,db)

@app.post("/startinstance")
async def createdb(cont_id,curruser=Depends(get_current_user),db: Session = Depends(get_db)):
    return  startinstance(cont_id,curruser,db)

@app.post("/deleteinstance")
async def createdb(cont_id,curruser=Depends(get_current_user),db: Session = Depends(get_db)):
    return del_instance(cont_id,curruser,db)

@app.get("/connect")
async def connectdb(curruser=Depends(get_current_user),db: Session = Depends(get_db)):
    return  connectdb_cont(curruser,db)

@app.post("/excute")
async def exe(form_data:Annotated[DbQueryForm,Body(embed=True)],curruser=Depends(get_current_user),db: Session = Depends(get_db)):
    return await executeq(curruser,db,form_data.db_id,form_data.db_query)

