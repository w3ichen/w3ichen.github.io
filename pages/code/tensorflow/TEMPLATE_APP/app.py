from flask import Flask,request,render_template,url_for
from model import predict

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("TEMPLATE.html")

@app.route('/predict',methods=['GET','POST'])
def predict():
    data = request.form.get('data')
    if data == None:
        return 'Got None'
    else:
        # model.predict.predict returns a dictionary
        prediction = model.predict.predict(data) 
    return json.dumps(str(prediction))

if __name__ == "__main__":
    app.run(debug=True)