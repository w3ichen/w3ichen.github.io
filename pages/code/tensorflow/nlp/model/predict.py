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
#ENGLISH##################
englishModel = tf.keras.models.load_model('model/englishSentence.h5',compile=False)
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
def englishPredict(startString):
	char2num = {'\t': 0, '\n': 1, ' ': 2, '!': 3, '"': 4, '#': 5, '$': 6, '%': 7, '&': 8, "'": 9, '(': 10, ')': 11, '*': 12, '+': 13, ',': 14, '-': 15, '.': 16, '/': 17, '0': 18, '1': 19, '2': 20, '3': 21, '4': 22, '5': 23, '6': 24, '7': 25, '8': 26, '9': 27, ':': 28, ';': 29, '<': 30, '=': 31, '>': 32, '?': 33, '@': 34, 'A': 35, 'B': 36, 'C': 37, 'D': 38, 'E': 39, 'F': 40, 'G': 41, 'H': 42, 'I': 43, 'J': 44, 'K': 45, 'L': 46, 'M': 47, 'N': 48, 'O': 49, 'P': 50, 'Q': 51, 'R': 52, 'S': 53, 'T': 54, 'U': 55, 'V': 56, 'W': 57, 'X': 58, 'Y': 59, 'Z': 60, '[': 61, ']': 62, '^': 63, '_': 64, '`': 65, 'a': 66, 'b': 67, 'c': 68, 'd': 69, 'e': 70, 'f': 71, 'g': 72, 'h': 73, 'i': 74, 'j': 75, 'k': 76, 'l': 77, 'm': 78, 'n': 79, 'o': 80, 'p': 81, 'q': 82, 'r': 83, 's': 84, 't': 85, 'u': 86, 'v': 87, 'w': 88, 'x': 89, 'y': 90, 'z': 91, '{': 92, '}': 93, '~': 94, '\xa0': 95, '¢': 96, '£': 97, '¥': 98, '«': 99, '\xad': 100, '°': 101, '²': 102, '³': 103, '´': 104, '·': 105, '¹': 106, 'º': 107, '»': 108, '¼': 109, '½': 110, 'À': 111, 'Á': 112, 'Å': 113, 'Ç': 114, 'É': 115, 'Í': 116, 'Ö': 117, '×': 118, 'Ø': 119, 'Ú': 120, 'Ü': 121, 'ß': 122, 'à': 123, 'á': 124, 'â': 125, 'ã': 126, 'ä': 127, 'å': 128, 'æ': 129, 'ç': 130, 'è': 131, 'é': 132, 'ê': 133, 'ë': 134, 'ì': 135, 'í': 136, 'î': 137, 'ï': 138, 'ð': 139, 'ñ': 140, 'ó': 141, 'ô': 142, 'ö': 143, 'ø': 144, 'ú': 145, 'û': 146, 'ü': 147, 'þ': 148, 'ā': 149, 'ă': 150, 'ć': 151, 'Ĉ': 152, 'ĉ': 153, 'ċ': 154, 'Č': 155, 'č': 156, 'đ': 157, 'Ē': 158, 'ē': 159, 'ę': 160, 'ĝ': 161, 'ğ': 162, 'ĥ': 163, 'ī': 164, 'İ': 165, 'ı': 166, 'ĵ': 167, 'Ł': 168, 'ł': 169, 'ń': 170, 'ņ': 171, 'ō': 172, 'ŏ': 173, 'ő': 174, 'œ': 175, 'ś': 176, 'ŝ': 177, 'ş': 178, 'š': 179, 'ū': 180, 'ŭ': 181, 'ź': 182, 'ż': 183, 'ž': 184, 'ǎ': 185, 'ǐ': 186, 'ǔ': 187, 'ǭ': 188, 'ș': 189, 'ə': 190, 'ɣ': 191, 'ʰ': 192, 'ʻ': 193, 'ʼ': 194, 'ˈ': 195, 'Σ': 196, 'Τ': 197, 'Ω': 198, 'α': 199, 'β': 200, 'γ': 201, 'ε': 202, 'ζ': 203, 'κ': 204, 'μ': 205, 'ν': 206, 'ο': 207, 'π': 208, 'τ': 209, 'М': 210, 'С': 211, 'Т': 212, 'Ч': 213, 'а': 214, 'в': 215, 'г': 216, 'д': 217, 'е': 218, 'з': 219, 'и': 220, 'й': 221, 'к': 222, 'л': 223, 'н': 224, 'о': 225, 'р': 226, 'с': 227, 'т': 228, 'у': 229, 'ч': 230, 'ы': 231, 'ь': 232, 'э': 233, 'я': 234, 'є': 235, 'ї': 236, 'ׁ': 237, 'ׂ': 238, 'א': 239, 'י': 240, 'ל': 241, 'ן': 242, 'ע': 243, 'ץ': 244, '؟': 245, 'أ': 246, 'ئ': 247, 'ا': 248, 'ة': 249, 'ت': 250, 'خ': 251, 'ر': 252, 'ط': 253, 'ل': 254, 'ّ': 255, 'न': 256, 'प': 257, 'ल': 258, 'ा': 259, 'ी': 260, 'े': 261, 'ᵗ': 262, 'ḍ': 263, 'ḥ': 264, 'ṃ': 265, 'ṇ': 266, 'Ṛ': 267, 'ṛ': 268, 'ṣ': 269, 'ṭ': 270, 'ẓ': 271, 'ẽ': 272, 'ồ': 273, 'ứ': 274, '\u200a': 275, '\u200b': 276, '\u200e': 277, '\u200f': 278, '‐': 279, '‑': 280, '–': 281, '—': 282, '―': 283, '‘': 284, '’': 285, '“': 286, '”': 287, '…': 288, '\u202f': 289, '″': 290, '‽': 291, '⁰': 292, '₂': 293, '₣': 294, '₤': 295, '₩': 296, '₪': 297, '₫': 298, '€': 299, '₰': 300, '₳': 301, '₴': 302, '₵': 303, '₹': 304, '™': 305, '→': 306, '−': 307, '√': 308, '⊂': 309, '□': 310, '☉': 311, '☭': 312, '⨯': 313, 'ⵥ': 314, '々': 315, 'あ': 316, 'ウ': 317, 'エ': 318, 'ス': 319, 'ト': 320, 'レ': 321, '・': 322, 'ー': 323, '三': 324, '不': 325, '么': 326, '什': 327, '傳': 328, '典': 329, '務': 330, '問': 331, '國': 332, '够': 333, '夢': 334, '政': 335, '明': 336, '樓': 337, '水': 338, '港': 339, '滸': 340, '演': 341, '甚': 342, '粵': 343, '紅': 344, '義': 345, '西': 346, '記': 347, '詞': 348, '語': 349, '遊': 350, '顧': 351, '香': 352, '麼': 353, '？': 354, '🌡': 355, '😂': 356, '😷': 357, '🤒': 358, '🤧': 359, '\U0001f92e': 360, '\U0001f9a0': 361, '\U0001f9fc': 362}
	num2char = list(char2num.keys())
	startStringCopy = startString
	# 1. Convert start string to integers
	startString = [char2num[char] for char in startString]
	startString = tf.expand_dims(startString,0)
	# 2. Empty list to store results
	text_generated = []
	# 3. Reset batch size == 1
	englishModel.reset_states()
	# 4. loop through words to generate
	for i in range(50):
		predictions = englishModel(startString)
		predictions = tf.squeeze(predictions, 0) # remove batch dimension
		predicted_id = tf.random.categorical(predictions, num_samples=1)[-1,0].numpy()
		startString = tf.expand_dims([predicted_id], 0)
		text_generated.append(num2char[predicted_id])
	return (startStringCopy + ''.join(text_generated))