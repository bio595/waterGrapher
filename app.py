import os

from flask import Flask, render_template, json, request, session, abort, make_response

app = Flask(__name__)


@app.route("/")
def index():
	return render_template('index.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
	if(request.method == "POST"):
		#retrieve the username and password sent
		data = request.json
		if data is None:
			abort(400)
		if(not 'username' in data or not 'password' in data):
			abort(404)
		else:
			#do awesome database call
			if data['username'] == 'mike' and data['password'] == 'sweet':
				return make_response("OK", 200)
			else:
				return make_response("Nah", 403)
	else:
		return render_template('login.html')

if __name__ == '__main__':
	app.secret_key = "A key what should be secret"
	app.run(debug=True)