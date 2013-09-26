from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from models import Base
from datetime import date
import json
class Day(Base):

	__tablename__ = 'days'

	id = Column(Integer, primary_key=True)
	user_id = Column(String, ForeignKey("users.username"))
	date = Column(Date, default=date.today)

	consumption = relationship(
		"Consumption", 
		backref='day',
		cascade='delete')

	def __init__(self, username):
		super(Day, self).__init__()
		self.user_id = username

	def serialize(self):
		return json.dumps({'date': str(self.date), 'consumption' : self.consumption})
