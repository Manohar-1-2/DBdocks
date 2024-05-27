from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from  models.users import User
from  models.users import DbContainer
from fastapi import HTTPException,status
def get_user(db: Session, user_name: str):
    return db.query(User).filter(User.name == user_name).first()

def create_user(db: Session, user):
    db_user = User(email=user.email, hashed_password=user.password, name=user.name)
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
        return {"message":"sussesfull signed in"}
    except IntegrityError as e:
        db.rollback()  # Rollback the session to ensure it's in a clean state
        # Check if the error is due to the unique constraint on email
        if "UNIQUE constraint" in str(e.orig):
            raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists"
        )
        else:
            raise
def create_db_container(db: Session,contdata):
    db_container=DbContainer(user_id=contdata["user_id"],container_id=contdata["container_id"],username=contdata["username"],port=contdata["port"],url=contdata["url"],password=contdata["password"])
    db.add(db_container)
    db.commit()
    db.refresh(db_container)
    return db_container

def getdbinf(db :Session,user):
    return db.query(DbContainer).filter(DbContainer.user_id==user['id']).all()


def get_db_inf_by_id(db :Session,user,cont_id):
    return db.query(DbContainer).filter(DbContainer.user_id==user['id'] and DbContainer.container_id==cont_id).all()


def update_cont_status(db :Session,cont_id,status):
    #update_statement = DbContainer.update().where(DbContainer.container_id==cont_id).values(your_column=status)
    row_to_update = db.query(DbContainer).filter_by(container_id=cont_id).first()
    if row_to_update:
        row_to_update.status =status
        db.commit()
    else:
        print('container id not found')

def delete_cont(db :Session,cont_id):
    user_to_delete = db.query(DbContainer).filter(DbContainer.container_id == cont_id).first()
    if user_to_delete:
        db.delete(user_to_delete)
        db.commit()
    else:
        print("User not found")
