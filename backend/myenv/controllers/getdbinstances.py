from models.crud import getdbinf
def getinstances(curruser,db):
    return getdbinf(db,curruser)
