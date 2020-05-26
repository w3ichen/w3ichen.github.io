from flask import Flask,request, render_template
from model import predict
# create the flask object
app = Flask(__name__)

class task():
	content = "hello"



@app.route('/')
def index():
	tasks = task()
	return render_template('handwriting.html', tasks=tasks)

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