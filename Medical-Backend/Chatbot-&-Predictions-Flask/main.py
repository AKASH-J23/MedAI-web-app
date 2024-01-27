from flask import Flask, request
from flask_cors import CORS
from medAPI import getAPI_Bot

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello World"

@app.route("/chatAPI", methods=['POST'])
def chatAPI():
    body = request.get_json()
    response= getAPI_Bot(body['user'])
    response = response.replace("Invictus", "MedAi")
    response = {"bot":response}
    print(response)
    return response

if __name__ == "__main__":
    app.run(host="localhost",port = 8000, debug = True)