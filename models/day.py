from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from models import Base
from datetime import date
class Day(Base):

	__tablename__ = 'history'

	id = Column(Integer, primary_key=True)
	user = Column(String, ForeignKey("users.username"))
	weight = Column(Integer)
	date = Column(Date, default=date.today)

	consumption = relationship()

	def __init__(self, user, weight):
		super(Day, self).__init__()
		self.user = user
		self.weight = weight

