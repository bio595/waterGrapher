from sqlalchemy import Column, Integer, ForeignKey, DateTime, Float
from models import Base
from datetime import datetime

class Consumption(Base):

	__tablename__ = 'consumption'

	id = Column(Integer, primary_key=True)
	day_id = Column(Integer, ForeignKey("days.id"))
	amount = Column(Float)
	time = Column(DateTime, default=datetime.now)

	def __init__(self, user, weight):
		super(Consumption, self).__init__()
		self.user = user
		self.weight = weight


	def serialize():
		pass

	def deserialize():
		pass

