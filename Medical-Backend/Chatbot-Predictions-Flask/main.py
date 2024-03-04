from flask import Flask, request, jsonify
from flask_cors import CORS
from medAPI import getAPI_Bot
from predictions import Diabetes, Heart, Tuberculosis, Pneumonia

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
    
@app.route("/tuberculosis-prediction", methods=['POST'])
def tuber_predict():
    try:
        data = request.get_data
        result = Tuberculosis(data)
        print(result)
        return result 
    except Exception as e:
        return (e)
    
if __name__ == "__main__":
    app.run(host="localhost",port = 8000, debug = True)