from models.crud import create_user
def signup(data,db):
    created_user=create_user(db,data)
    return created_user


