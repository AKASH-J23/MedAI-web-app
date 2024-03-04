from flask import Flask, request, jsonify
from flask_cors import CORS
from medAPI import getAPI_Bot
from predictions import Diabetes, Heart, Tuberculosis, Pneumonia
import traceback
import logging
from werkzeug.utils import secure_filename
import os
from PIL import Image
import numpy as np
import io
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello World"

@app.route("/chatAPI", methods=['POST'])
def chatAPI():
    try:
        body = request.get_json()
        response= getAPI_Bot(body['user'])
        response = response.replace("Invictus", "MedAi")
        response = {"bot":response}
        return response
    except Exception as e:
        return (str(e))

@app.route("/diabetes-prediction", methods=['POST'])
def diabetes_predict():
    try:
        data = request.get_json()
        
        # Access 'data' key to get the list
        input_data = data.get('data', [])
        
        # Handle the case where 'data' key is missing or is not a list
        if not isinstance(input_data, list) or len(input_data) != 12:
            return jsonify({"error": "Invalid data format"}), 400

        # Convert the input data to a NumPy array
        input_array = [float(feature) for feature in input_data]
        input_array = [input_array]
        
        # Call the Diabetes function to get the prediction
        result = Diabetes(input_array)
        return jsonify({'success': True, 'message': 'Prediction successful', 'prediction': result})
    
    except Exception as e:
        return jsonify({'success': False, 'message': 'Prediction failed', 'error': str(e)})
    
@app.route("/heart-disease-prediction", methods=['POST'])
def heart_predict():
    try:
        data = request.get_json()
        # Access 'data' key to get the list
        input_data = data.get('data', [])
        
        # Handle the case where 'data' key is missing or is not a list
        if not isinstance(input_data, list) or len(input_data) != 13:
            return jsonify({"error": "Invalid data format"}), 400
        
        # Convert the input data to a NumPy array
        input_array = [float(feature) for feature in input_data]
        input_array = [input_array]
        # Call the Diabetes function to get the prediction
        result = Heart(input_array)
        return jsonify({'success': True, 'message': 'Prediction successful', 'prediction': result})
    
    except Exception as e:
        return jsonify({'success': False, 'message': 'Prediction failed', 'error': str(e)})

# Create the 'temp' directory if it doesn't exist
temp_directory = 'temp'
os.makedirs(temp_directory, exist_ok=True)

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/tuberculosis-prediction", methods=['POST'])
def tuber_predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image_file = request.files['image']

        if image_file.filename == '' or not allowed_file(image_file.filename):
            return jsonify({'error': 'Invalid file'}), 400

        img = Image.open(image_file)
        img_rgb = img.convert("RGB")
        img_rgb = img_rgb.resize((300, 300))
        img_array = np.array(img_rgb)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        result = Tuberculosis(img_array)

        return jsonify({'success': True, 'message': 'Prediction successful', 'prediction': result})

    except Exception as e:
        return jsonify({'success': False, 'message': 'Prediction failed', 'error': str(e)})
        
@app.route("/pneumonia-prediction", methods=['POST'])
def pneumonia_predict():
    try:
        # Assuming the Tuberculosis class has a method named 'predict' for making predictions
        # Also assuming you are sending an image file in the 'image' field of the form data
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image_file = request.files['image']

        if image_file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Make predictions using your Tuberculosis model
        result = Pneumonia.predict(image_file)

        # Assuming 'result' is a dictionary containing prediction results
        return jsonify({'success': True, 'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == "__main__":
    app.run(host="localhost",port = 8000, debug = True)