import numpy as np
import os
import pandas as pd
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
import cv2
import tensorflow 
from tensorflow.keras.preprocessing import image
from keras.models import load_model
import pickle
from PIL import Image


# X------------------------------------------------------------------------------------X
diabetes_model_path = r"predictions\Machine Learning\models\diabetes-dt-model.pkl"
heart_model_path = r"predictions\Machine Learning\models\heart-rf-model.pkl"
# pneumonia_model_path = r"C:\Users\AKASH J\Desktop\MedAPP\Medical-Backend\Chatbot-Predictions-Flask\predictions\Neural Nets\Models\pneumonia\resnet-pneumonia.h5"
pneumonia_model_path=r"C:\Users\AKASH J\Desktop\Unused models medapp\pneumonia\sequential-pneumonia.h5"
tuberculosis_model_path = r"C:\Users\AKASH J\Desktop\MedAPP\Medical-Backend\Chatbot-Predictions-Flask\predictions\Neural Nets\Models\tuberculosis\tuberculosis-inceptionv3.h5"
predictions_path = os.path.abspath(__file__)
# print("predictions.py file location:", predictions_path)

# X------------------------------------------------------------------------------------X
def Diabetes(input_data):
    # Assuming 'predictions.py' is in 'Chatbot-Predictions-Flask' directory
    with open(os.path.join(os.path.dirname(predictions_path), diabetes_model_path), 'rb') as file:
        model = pickle.load(file)
        print("Diabetes Model Loaded")
    
    # input_data = np.array([[58, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0]])  # Converted to a NumPy array

    # Standardize the data (if needed, provide the scaler object)
    # std_data = scaler.transform(input_data)

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
    
    # input_data = np.array([[57,0,0,120,354,0,1,163,1,0.6,2,0,2]])  # Converted to a NumPy array

    # Standardize the data (if needed, provide the scaler object)
    # std_data = scaler.transform(input_data)

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
    
img_path = r"C:\Users\AKASH J\Desktop\testing\pneumonia\Testing-Data\Normal-Sample-XRay\NORMAL  (4).jpeg"
# Tuberculosis(img_path)  

# X------------------------------------------------------------------------------------X      

def Pneumonia(file):
    try:
        model = load_model(pneumonia_model_path)
        print("Pneumonia model Loaded !")
        img = image.load_img(file, target_size=(224, 224))
        img = image.img_to_array(img)
        img = np.expand_dims(img, axis=0)
        img = img / 255

        result = model.predict(img)
        op = result[0, 0]

        if op > 0.5:
            # return True  
            print("Pneumonia")
            # PNEUMONIA
        else:
            print("No disease")
            # return False  # NORMAL
    except Exception as e:
        print("Error during prediction:", e)
        return False

Pneumonia(img_path)