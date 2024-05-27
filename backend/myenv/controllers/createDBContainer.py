import docker
from models.crud import create_db_container
PORT_RANGE_START=49152
PORT_RANGE_END=65535
allocated_ports=set()

def allocate_port():
    for port in range(PORT_RANGE_START, PORT_RANGE_END + 1):
        if port not in allocated_ports:
            allocated_ports.add(port)
            return port
    raise Exception("No available ports in the range")

def release_port(port):
    allocated_ports.remove(port)
async def createDBCont(form_data,curruser,db):
    client=docker.from_env()
    port=allocate_port() 
    try:
        container = client.containers.run(
            "postgres:alpine",
            detach=True,
            environment={"POSTGRES_PASSWORD": form_data.db_password},
            ports={f"5432/tcp": port}
        )
        container_info = container.attrs
        ip_address = container_info['NetworkSettings']['IPAddress']
                # Return connection details
        connection_details = {
            "host": ip_address,
            "port": port,  
            "username": "root",  
            "password": form_data.db_password
        }
        con={
            "user_id":curruser["id"],
            "container_id":container.id,
            "port":port,
            "password":form_data.db_password,
            "username":"root",
            "url":"localhost:"+str(port),
        }
        create_db_container(db,con)
    except  docker.errors.APIError as e:
        return {"error": f"Failed to create database: {str(e)}"}
    return connection_details
