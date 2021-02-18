from flask import Flask, request
from flask_pymongo import PyMongo
from datetime import date
from json import dumps

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://exceed_group11:2grm46fn@158.108.182.0:2255/exceed_group11'
mongo = PyMongo(app)

building = mongo.db.building
users = mongo.db.users


@app.route('/hello', methods=['GET'])
def hello():
    a = "Hello world!"
    return f"<h1>{a}</h1>"


@app.route('/', methods=['GET'])
def get_data():
    building_data = building.find()
    result = []
    for data in building_data:
        result.append({
            "floor": data["floor"]
        })
    return {"data": result}


@app.route('/', methods=['PUT'])
def update_data():
    data = request.json

    building.insert_one({"floor": 1})

    return {"message": "insert complete!"}


@app.route('/signin', methods=['POST'])
def signin():
    user_data = request.json
    user = users.find_one({'username': user_data['username']})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='3000', debug=True)
