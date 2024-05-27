import docker
from models.crud import update_cont_status
def startinstance(cont_id,curruser,db):
    client=docker.from_env()
    container=client.containers.get(cont_id)
    if container.status=='paused':
        update_cont_status(db,cont_id,'running')
        container.unpause()
    return {"message":"Successfully started"}