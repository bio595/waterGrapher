from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from models import Base
import json
class User(Base):

	__tablename__ = 'users'

	id = Column(Integer, primary_key=True)
	username = Column(String)
	password = Column(String)

	days = relationship(
		'Day',
		backref='user',
		cascade='delete'
	)

	def __init__(self, username, password):
		super(User, self).__init__()
		self.username = username
		self.password = password

	def serialize(self):
		return json.dumps({'username' : self.username, 'password' : self.password, "days": self.days})
