from flask import Flask, request
from flask_cors import CORS
from medAPI import getAPI_Bot
from predictions import Diabetes, Heart

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
        input_data = [
            data['age'],
            data['gender'],
            data['polyuria'],
            data['polydipsia'],
            data['sudden_weight_loss'],
            data['weakness'],
            data['polyphagia'],
            data['genital_thrush'],
            data['visual_blurring'],
            data['irritability'],
            data['partial_paresis'],
            data['alopecia']
        ]
        # Convert the input data to a NumPy array
        input_array = [float(feature) for feature in input_data]
        input_array = [input_array]
        # Call the Diabetes function to get the prediction
        result = Diabetes(input_array)
        # print("prediction:", result)
        return (result)

    except Exception as e:
        print('error', str(e))
        return(str(e))
    
@app.route("/heart-disease-prediction", methods=['POST'])
def heart_predict():
    try:
        data = request.get_json()
        input_data = [
            data['age'],
            data['sex'],
            data['cp'],
            data['trestbps'],
            data['chol'],
            data['fbs'],
            data['restecg'],
            data['thalach'],
            data['exang'],
            data['oldpeak'],
            data['slope'],
            data['ca'],
            data['thal']
        ]
        # Convert the input data to a NumPy array
        input_array = [float(feature) for feature in input_data]
        input_array = [input_array]
        # Call the Diabetes function to get the prediction
        result = Heart(input_array)
        # print("prediction:", result)
        return (result)

    except Exception as e:
        return(str(e))

if __name__ == "__main__":
    app.run(host="localhost",port = 8000, debug = True)