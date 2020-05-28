import tensorflow as tf
model = tf.keras.models.load_model('model/model.h5')

def predict(data):
    ###  IMAGE PREPROCESSING  ###
                  # |
                  # |
    #  data-->preprocessed_data #
                  # |
                  # |
    ###          END          ###

    prediction = model.predict(preprocessed_data)
    
    return prediction