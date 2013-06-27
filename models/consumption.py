from sqlalchemy import Column, Integer, ForeignKey, DateTime
from models import Base
from datetime import datetime
class Day(Base):

	__tablename__ = 'consumption'

	day = Column(Integer, ForeignKey("history.id"))
	amount = Column(Float)
	time = Column(DateTime, default=datetime.now)

	def __init__(self, user, weight):
		super(Day, self).__init__()
		self.user = user
		self.weight = weight


	def serialize():
		pass

	def deserialize():
		

