from flask import Flask,request,render_template,url_for
import model
from model import predict
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("images.html")

@app.route('/predict',methods=['GET','POST'])
def prediction():
    data = request.data
    prediction = model.predict.predict(data) 
    return json.dumps(str(prediction))

if __name__ == "__main__":
    app.run(debug=True)