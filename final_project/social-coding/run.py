from app import app

app.secret_key = 'why would I tell you my secret key?'
app.run(debug=True)
