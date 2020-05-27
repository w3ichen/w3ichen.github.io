from flask import Flask,request, render_template,jsonify, url_for
import tensorflow as tf
import base64
import numpy as np
import io
from PIL import Image

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('handwriting.html', tasks="same")

model = tf.keras.models.load_model('model.h5')

def num2char(num):
  if num >= 10 and num <= 35:
    # upper case
    return chr(num+55)
  elif num >= 36 and num <=61:
    # lower case
    return chr(num+61)
  else:
    return num

def predict(data):
	# PROCESS the IMAGE
	image = base64.decodebytes(data.split(b',')[1]) # decode
	image = Image.open(io.BytesIO(image)) # open as PIL Image
		
	image.save('static/image.png', 'PNG')

	image = image.convert('L') # convert to grayscale
	image = image.resize((28,28),Image.ANTIALIAS) # resize to 28X28
	image = np.asarray(image) # convert to an array
	image = image.astype('float32')/255 # scale between 0 and 1
	image = image.reshape(1,28,28,1) # reshape

	prediction = model.predict(image); 

	return str(num2char(np.argmax(prediction)))

@app.route('/update', methods=['POST'])
def update():

	prediction = predict(request.data)
	print(prediction)
	return jsonify({'prediction':prediction})

if __name__ == "__main__":
    app.run(debug=True)