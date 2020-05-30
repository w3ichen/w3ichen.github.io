import tensorflow as tf
import numpy as np
import requests
from PIL import Image
import io
import base64

model10 = tf.keras.models.load_model('model/model10.h5')
model100coarse = tf.keras.models.load_model('model/model100coarse.h5')
model100fine = tf.keras.models.load_model('model/model100fine.h5')

def predict(url):
	url = url[4:].decode("utf-8").replace('%3A',':').replace('%2F','/')
	image = requests.get(url, stream=True).content

	image = Image.open(io.BytesIO(image))  # open as PIL Image
	image = image.resize((32, 32), Image.ANTIALIAS)  # resize to 28X28
	image = np.asarray(image)  # convert to an array
	image = image.astype('float32')/255.0  # scale between 0 and 1
	image = image.reshape(1, 32, 32, 3)  # reshape

	prediction10 = model10.predict(image)
	prediction100coarse = model100coarse.predict(image)
	prediction100fine = model100fine.predict(image)

	# { ['label','percentage'],[],[] },  { [],[],[] }, { [],[],[] }
	output = []

	for i in range(3):
		output.append(str(labels[np.argmax(prediction10)])+":"+str(np.amax(prediction10)))
		prediction10[0][np.argmax(prediction10)] = 0  # set old max to 0

	for i in range(3):
		output.append(str(coarseLabels[np.argmax(prediction100coarse)])+":"+str(np.amax(prediction100coarse)))
		prediction100coarse[0][np.argmax(prediction100coarse)] = 0

	for i in range(3):
		output.append(str(fineLabels[np.argmax(prediction100fine)])+":"+str(np.amax(prediction100fine)))
		prediction100fine[0][np.argmax(prediction100fine)] = 0

	print(output)
	return output

labels = ['airplane', 'automobile', 'bird', 'cat', 'deer',
              'dog', 'frog', 'horse', 'ship', 'truck']
fineLabels = [
    'apple',  # id 0
    'aquarium_fish',
    'baby',
    'bear',
    'beaver',
    'bed',
    'bee',
    'beetle',
    'bicycle',
    'bottle',
    'bowl',
    'boy',
    'bridge',
    'bus',
    'butterfly',
    'camel',
    'can',
	'castle',
	'caterpillar',
	'cattle',
	'chair',
	'chimpanzee',
	'clock',
	'cloud',
	'cockroach',
	'couch',
	'crab',
	'crocodile',
	'cup',
	'dinosaur',
	'dolphin',
	'elephant',
	'flatfish',
	'forest',
	'fox',
	'girl',
	'hamster',
	'house',
	'kangaroo',
	'computer_keyboard',
	'lamp',
	'lawn_mower',
	'leopard',
	'lion',
	'lizard',
	'lobster',
	'man',
	'maple_tree',
	'motorcycle',
	'mountain',
	'mouse',
	'mushroom',
	'oak_tree',
	'orange',
	'orchid',
	'otter',
	'palm_tree',
	'pear',
	'pickup_truck',
	'pine_tree',
	'plain',
	'plate',
	'poppy',
	'porcupine',
	'possum',
	'rabbit',
	'raccoon',
	'ray',
	'road',
	'rocket',
	'rose',
	'sea',
	'seal',
	'shark',
	'shrew',
	'skunk',
	'skyscraper',
	'snail',
	'snake',
	'spider',
	'squirrel',
	'streetcar',
	'sunflower',
	'sweet_pepper',
	'table',
	'tank',
	'telephone',
	'television',
	'tiger',
	'tractor',
	'train',
	'trout',
	'tulip',
	'turtle',
	'wardrobe',
	'whale',
	'willow_tree',
	'wolf',
	'woman',
	'worm']
coarseLabels = [
	"aquatic mammals",
	"fish",
	"flowers",
	"food containers",
	"fruit and vegetables",
	"household electrical devices",
	"household furniture",
	"insects",
	"large carnivores",
	"large man-made outdoor things",
	"large natural outdoor scenes",
	"large omnivores and herbivores",
	"medium-sized mammals",
	"non-insect invertebrates",
	"people",
	"reptiles",
	"small mammals",
	"trees",
	"vehicles 1",
	"vehicles 2"]