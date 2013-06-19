import os

from flask import Flask, render_template, request, session, abort, make_response
from models import User, db
import json
from server import app

@app.route("/")
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
			#do awesome database call
			if data['username'] == 'mike' and data['password'] == 'sweet':
				return make_response("OK", 200)
			else:
			 	return make_response("Nah", 403)
	else:
		return render_template('login.html')

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
