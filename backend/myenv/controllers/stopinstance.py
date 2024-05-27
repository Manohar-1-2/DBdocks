import docker
from docker.errors import NotFound
from models.crud import update_cont_status
from fastapi import HTTPException,status
def stopinstance(cont_id, curruser, db):
    client = docker.from_env()
    try:
        container = client.containers.get(cont_id)
    except NotFound:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="container not found"
        )
    except Exception as e:
        return {"error": str(e)}

    if container.status == 'running':
        try:
            update_cont_status(db, cont_id, 'paused')
            container.pause()
        except Exception as e:
            # Handle error updating container status or pausing container
            return {"error": str(e)}
    return {"message":"sussesfully stopped"}
