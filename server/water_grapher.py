import os

from flask import Flask, render_template, request, abort, redirect, url_for, session, make_response
from models import User, db
import json
from server import app

def loggedIn(f):
	def new_f():
		if 'user' not in session:
			return redirect(url_for('login'))
		else:
			return f()
	return new_f

@app.route("/")
@loggedIn
def index():
	return render_template('index.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
	if(request.method == "POST"):
		#retrieve the username and password sent
		data = request.json

		if(data is None or not 'username' in data or not 'password' in data):
			abort(400)
		else:
			count = User.query.filter(User.username == data['username']).count()
			if(count == 0):
				abort(404) #that user doesnt exist
			else:
				passIsCorrect = User.query.filter(User.username == data['username'], User.password == data['password']).count()
				if(passIsCorrect):
					session['user'] = data['username']
					response = make_response('logged in succesfully', 307)
					return response
				else:
					abort(401)
		
	else:
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
			return json.dumps(data)

@app.route("/history")
@loggedIn
def history():
	pass


@app.route("/history/<int:year>-<int:month>-<int:day>")
def volumeForDay(year, month, day):
	return str(year) + "-" + str(month) + "-" + str(day)
