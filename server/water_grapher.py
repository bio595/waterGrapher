import os

from flask import Flask, flash, render_template, request, abort, redirect, url_for, session, make_response
from models import User, db, Day, Consumption
from functools import wraps
import json
from server import app
from datetime import date, datetime

def loggedIn(f):
	@wraps(f)
	def new_f():
		print "Heyo"
		if 'user' not in session:
			return redirect('/login')
		else:
			return f()
	return new_f


@app.route("/")
@loggedIn
def index():
	return render_template('index.html', user=session['user'])

@app.route("/login", methods=['GET', 'POST'])
def login():
	if(request.method == "POST"):
		#retrieve the username and password sent
		data = request.form

		if(data is None or not 'username' in data or not 'password' in data):
			abort(400)
		else:
			count = User.query.filter(User.username == data['username']).count()
			if(count == 0):
				return render_template('login.html', error='username')
			else:
				passIsCorrect = User.query.filter(User.username == data['username'], User.password == data['password']).count()
				if(passIsCorrect):
					session['user'] = data['username']
					return redirect('/')
				else:
					return render_template('login.html', error='password')
					
		
	else:
		if 'user' in session:
			return redirect('/')
		return render_template('login.html')

@app.route("/logout", methods=['POST'])
def logout():
	del session['user']
	return make_response('OK', 200)

@app.route("/signup", methods=['POST'])
def signup():
	data = request.json
	if(data is None or not 'username' in data or not 'password' in data):
		abort(400)
	else:
		#check if user already exists
		count = User.query.filter(User.username == data['username']).count()
		if(count != 0):
			abort(409)
		else:
			#create the user
			db.add(User(data['username'], data['password']))
			db.commit()
			#create a session for the user
			session['user'] = data['username']
			#redirect them
			return redirect('/')


@app.route("/history")
@loggedIn
def history():
	'''Returns a list of days with consumption details'''
	#Retrieve the User that is logged in.
	user = User.query.filter(User.username == session['username']).first()
	days = []
	for day in user.days:
		days.append(json.loads(day.serialize()))
	return json.dumps(days)


@app.route("/today")
@loggedIn
def today():
	'''Return a list of consumption details for the current day'''
	#Retrieve the User that is logged in.
	user = User.query.filter(User.username == session['username']).first()
	#fetch list of days by user id and todays date
	query = Day.query.filter(Day.user_id == user.username, Day.date == date.today())
	if query.count() == 0:
		today = Day(user.username)
		db.add(today)
		db.commit()
		return today.serialize() + "other days exist but not today"
	else:
		return query.first().serialize() 


@app.route("/history/<int:year>-<int:month>-<int:day>")
@loggedIn
def volumeForDay(year, month, day):
	'''Return a list of consumption details for the specified day'''
	#Retrieve the User that is logged in.
	user = User.query.filter(User.username == session['username']).first()
	#fetch list of days by user id and todays date
	query = Day.query.filter(Day.user_id == user.username, Day.date == date(year, month, day))
	if query.count() == 0:
		abort(404)
	else:
		return query.first().serialize()
