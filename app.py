from server import app

if __name__ == '__main__':
	app.secret_key = "A key what should be secret"
	app.run(debug=True)