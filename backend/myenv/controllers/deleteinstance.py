import docker
from models.crud import delete_cont
def del_instance(cont_id,curruser,db):
    client=docker.from_env()
    container=client.containers.get(cont_id)
    delete_cont(db,cont_id)
    container.stop()
    container.remove()
    return {"message":"Sucessfully deleted"}