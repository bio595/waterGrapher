from sqlalchemy import Column, Integer, String


class User(Base):

	__tablename__ = 'users'

	id = Column(Integer, primary_key=True)
	username = Column(String)
	password = Column(String)

	def __init__(self, username, password):
		super(User, self).__init__()
		self.username = username
		self.password = password
