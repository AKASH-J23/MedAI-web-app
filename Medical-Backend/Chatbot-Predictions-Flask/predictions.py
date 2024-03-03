import numpy as np
import os
import pandas as pd
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
import cv2
import tensorflow 
from tensorflow.keras.preprocessing.image import array_to_img, img_to_array, load_img
from tensorflow.keras.preprocessing import image
from keras.models import load_model
import pickle


# X------------------------------------------------------------------------------------X
diabetes_model_path = r"predictions\Machine Learning\models\diabetes-dt-model.pkl"
heart_model_path = r"predictions\Machine Learning\models\heart-rf-model.pkl"
pneumonia_model_path = r"predictions\Neural Nets\Models\pneumonia\resnet-pneumonia.h5"
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
def Pneumonia():
    new_image_path = r"C:\Users\AKASH J\Desktop\testing\pneumonia\Testing-Data\Normal-Sample-XRay\NORMAL  (4).jpeg"
    # with open(os.path.join(os.path.dirname(predictions_path), pneumonia_model_path), 'rb') as file:
    # pneumonia_model_path = r"C:\Users\AKASH J\Desktop\MedAPP\Medical-Backend\Chatbot-Predictions-Flask\predictions\Neural Nets\Models\pneumonia"
    # model = TFSMLayer(pneumonia_model_path, call_endpoint='serving_default')
    print("Pneumonia model loaded")

    try:
        # Load and preprocess the image
        img = image.load_img(new_image_path, target_size=(224,224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0  # Normalize pixel values

        # Make predictions
        predictions = model.predict(img_array)

        # Interpret the result
        prediction_result = "PNEUMONIA" if predictions[0, 0] > 0.5 else "NORMAL"
        print("Prediction Result:", prediction_result)

    except Exception as e:
        print("Error:", str(e))

# Pneumonia()        
