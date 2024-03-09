import numpy as np
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
from tensorflow.keras.preprocessing import image
from keras.models import load_model
import pickle
from PIL import Image

# X------------------------------------------------------------------------------------X
diabetes_model_path = r"predictions\Machine Learning\models\diabetes-dt-model.pkl"
heart_model_path = r"predictions\Machine Learning\models\heart-rf-model.pkl"
pneumonia_model_path = r"C:\Users\AKASH J\Desktop\MedAPP\Medical-Backend\Chatbot-Predictions-Flask\predictions\Neural Nets\Models\pneumonia\model.h5"
tuberculosis_model_path = r"C:\Users\AKASH J\Desktop\MedAPP\Medical-Backend\Chatbot-Predictions-Flask\predictions\Neural Nets\Models\tuberculosis\tuberculosis-inceptionv3.h5"
predictions_path = os.path.abspath(__file__)

# X------------------------------------------------------------------------------------X
def Diabetes(input_data):
    with open(os.path.join(os.path.dirname(predictions_path), diabetes_model_path), 'rb') as file:
        model = pickle.load(file)
        print("Diabetes Model Loaded")

    prediction = model.predict(input_data)
    print(prediction)
    if prediction[0] == 0:
        return 0
    else:
        return 1

# X------------------------------------------------------------------------------------X
def Heart(input_data):
    with open(os.path.join(os.path.dirname(predictions_path), heart_model_path), 'rb') as file:
        model = pickle.load(file)
        print("Heart Model Loaded")
  
    prediction = model.predict(input_data)
    print(prediction)
    if prediction[0] == 0:
        return 0
    else:
        return 1

# X------------------------------------------------------------------------------------X

def Tuberculosis(img_array):
    try:
        model = load_model(tuberculosis_model_path)
        print("Tuberculosis model Loaded !")
        result = model.predict(img_array)
        op = result[0, 0]
        print(op)

        if op > 0.5:
            return 1
        else:
            return 0
    except Exception as e:
        print("Error during prediction:", e)
        return False  

# X------------------------------------------------------------------------------------X   

def Pneumonia(file):
    try:
        model = load_model(pneumonia_model_path)   
        print("Pneumonia Model loaded")
        predictions = model.predict(file)
        a = int(np.argmax(predictions))
        if a==1:
            return 1
        else:
            return 0
    except Exception as e:
        print("Error during prediction:", e)
        return False
