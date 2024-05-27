from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,Enum
from sqlalchemy.orm import relationship

from .database import Base
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

class DbContainer(Base):
    __tablename__ = "containerdetails"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    container_id=Column(String)
    port=Column(Integer)
    url=Column(String)
    password=Column(String)
    username=Column(String)
    status=Column(Enum('running', 'stopped', 'paused'),default='running')

    


