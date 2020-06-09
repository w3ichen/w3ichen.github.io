import tensorflow as tf
import pickle
#MOVIE####################
movieModel = tf.keras.models.load_model('model/movie.h5',compile=False)
with open("model/movieVocab.pickle", "rb") as movieVocabFile:
	movieVocab = pickle.load(movieVocabFile)
movieVocab = {k:(v+3) for k,v in movieVocab.items()} # move by 3 places
movieVocab["<PAD>"] = 0
movieVocab["<START>"] = 1
movieVocab["<UNK>"] = 2
movieVocab["<UNUSED>"] = 3
#SHAKESPEARE##############
shakespeareModel = tf.keras.models.load_model('model/shakespeare.h5',compile=False)
#POTTER###################
potterModel = tf.keras.models.load_model('model/potter.h5',compile=False)
#SPAM#####################
spamModel = tf.keras.models.load_model('model/spam.h5',compile=False)
with open("model/spamVocab.pickle","rb") as spamVocabFile:
	spamVocab = pickle.load(spamVocabFile)
##########################

def moviePredict(text):
	# remove all symbols
	text = text.replace(",","").replace(".","").replace("(","").replace(")","").replace(":","").replace("\"","").strip().split(" ")
	encoded = [1]
	for word in text:
		if word.lower() in movieVocab:
			encoded.append(movieVocab[word.lower()])
		else:
			encoded.append(2)
	encoded = tf.keras.preprocessing.sequence.pad_sequences([encoded], value=movieVocab["<PAD>"], padding="post")
	moviePrediction = movieModel.predict(encoded)
	return moviePrediction
def shakespearePredict(numChars, startString):
	char2num = {'\n': 0, ' ': 1, '!': 2, '$': 3, '&': 4, "'": 5, ',': 6, '-': 7, '.': 8, '3': 9, ':': 10, ';': 11, '?': 12, 'A': 13, 'B': 14, 'C': 15, 'D': 16, 'E': 17, 'F': 18, 'G': 19, 'H': 20, 'I': 21, 'J': 22, 'K': 23, 'L': 24, 'M': 25, 'N': 26, 'O': 27, 'P': 28, 'Q': 29, 'R': 30, 'S': 31, 'T': 32, 'U': 33, 'V': 34, 'W': 35, 'X': 36, 'Y': 37, 'Z': 38, 'a': 39, 'b': 40, 'c': 41, 'd': 42, 'e': 43, 'f': 44, 'g': 45, 'h': 46, 'i': 47, 'j': 48, 'k': 49, 'l': 50, 'm': 51, 'n': 52, 'o': 53, 'p': 54, 'q': 55, 'r': 56, 's': 57, 't': 58, 'u': 59, 'v': 60, 'w': 61, 'x': 62, 'y': 63, 'z': 64}
	num2char = list(char2num.keys())
	startStringCopy = startString
	# 1. Convert start string to integers
	startString = [char2num[char] for char in startString]
	startString = tf.expand_dims(startString,0)
	# 2. Empty list to store results
	text_generated = []
	# 3. Reset batch size == 1
	shakespeareModel.reset_states()
	# 4. loop through words to generate
	for i in range(int(numChars)):
		predictions = shakespeareModel(startString)
		predictions = tf.squeeze(predictions, 0) # remove batch dimension
		predicted_id = tf.random.categorical(predictions, num_samples=1)[-1,0].numpy()
		startString = tf.expand_dims([predicted_id], 0)
		text_generated.append(num2char[predicted_id])
	return (startStringCopy + ''.join(text_generated))

def potterPredict(numChars, startString):
	char2num = {'\t': 0, '\n': 1, '\x0c': 2, '\r': 3, ' ': 4, '!': 5, '"': 6, '&': 7, "'": 8, '(': 9, ')': 10, '*': 11, ',': 12, '-': 13, '.': 14, '/': 15, '0': 16, '1': 17, '2': 18, '3': 19, '4': 20, '5': 21, '6': 22, '7': 23, '8': 24, '9': 25, ':': 26, ';': 27, '<': 28, '=': 29, '>': 30, '?': 31, 'A': 32, 'B': 33, 'C': 34, 'D': 35, 'E': 36, 'F': 37, 'G': 38, 'H': 39, 'I': 40, 'J': 41, 'K': 42, 'L': 43, 'M': 44, 'N': 45, 'O': 46, 'P': 47, 'Q': 48, 'R': 49, 'S': 50, 'T': 51, 'U': 52, 'V': 53, 'W': 54, 'X': 55, 'Y': 56, 'Z': 57, '[': 58, '\\': 59, ']': 60, '^': 61, '_': 62, '`': 63, 'a': 64, 'b': 65, 'c': 66, 'd': 67, 'e': 68, 'f': 69, 'g': 70, 'h': 71, 'i': 72, 'j': 73, 'k': 74, 'l': 75, 'm': 76, 'n': 77, 'o': 78, 'p': 79, 'q': 80, 'r': 81, 's': 82, 't': 83, 'u': 84, 'v': 85, 'w': 86, 'x': 87, 'y': 88, 'z': 89, '|': 90, '}': 91, '~': 92, '\xad': 93, 'ß': 94, 'é': 95, 'ü': 96, '–': 97, '—': 98, '‘': 99, '’': 100, '“': 101, '”': 102, '•': 103, '…': 104}
	num2char = list(char2num.keys())
	startStringCopy = startString
	# 1. Convert start string to integers
	startString = [char2num[char] for char in startString]
	startString = tf.expand_dims(startString,0)
	# 2. Empty list to store results
	text_generated = []
	# 3. Reset batch size == 1
	potterModel.reset_states()
	# 4. loop through words to generate
	for i in range(int(numChars)):
		predictions = potterModel(startString)
		predictions = tf.squeeze(predictions, 0) # remove batch dimension
		predicted_id = tf.random.categorical(predictions, num_samples=1)[-1,0].numpy()
		startString = tf.expand_dims([predicted_id], 0)
		text_generated.append(num2char[predicted_id])
	return (startStringCopy + ''.join(text_generated))
def spamPredict(text):
	encoded = [1]
	# remove all symbols
	text = text.replace(",","").replace(".","").replace("(","").replace(")","").replace(":","").replace("\"","").strip().split(" ")
	for word in text:
		if word.isnumeric() == True:
		  # if it's a number
		  encoded.append(spamVocab["NUMBER"]) 
		elif (word.startswith("http")) or (word.startswith("www")):
			# if it's a link/URL
		  encoded.append(spamVocab["URL"])
		elif word.lower() in spamVocab:
		  encoded.append(spamVocab[word.lower()])
		else:
		  encoded.append(2) # unknown word
	# pad sequence
	encoded = tf.keras.preprocessing.sequence.pad_sequences([encoded], value=spamVocab["<PAD>"], padding="post")
	return spamModel.predict([encoded])
