from flask import Flask,request,render_template,url_for,json
import model
from model import predict

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("nlp.html")

@app.route('/movie',methods=['GET','POST'])
def movie():
	data = request.data.decode("utf-8") 
	prediction = model.predict.moviePredict(data) 
	return json.dumps(str(prediction))

@app.route('/shakespeare',methods=['GET','POST'])
def shakespeare():
	numChars = request.data.decode("utf-8").split("`")[0]
	startString = request.data.decode("utf-8").split("`")[1]
	text = model.predict.shakespearePredict(numChars, startString)
	return json.dumps(str(text).replace("\n","<br>"))

@app.route('/potter',methods=['GET','POST'])
def potter():
	numChars = request.data.decode("utf-8").split("`")[0]
	startString = request.data.decode("utf-8").split("`")[1]
	text = model.predict.potterPredict(numChars, startString)
	return str(text)
@app.route('/spam',methods=['GET','POST'])
def spam():
	data = request.data.decode("utf-8") 
	prediction = model.predict.spamPredict(data) 
	return json.dumps(str(prediction))

if __name__ == "__main__":
    app.run(debug=True)