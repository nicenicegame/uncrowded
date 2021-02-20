from flask import Flask, request
from flask_cors import CORS
from flask_jwt import JWT, jwt_required, current_identity
from flask_pymongo import PyMongo
from auth import authenticate, identity
from bson.objectid import ObjectId
from datetime import date


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://exceed_group11:2grm46fn@158.108.182.0:2255/exceed_group11'
app.config['SECRET_KEY'] = 'secret'
CORS(app)
mongo = PyMongo(app)
jwt = JWT(app, authenticate, identity)

building = mongo.db.building
users = mongo.db.users


@app.route('/hardware', methods=['GET'])
def get_hardware():

    data = {
        "room_id": 201,
        "capacity": 20,
        "current": 10,
        "mode": 0
    }

    return {"data": data}


@app.route('/hardware', methods=['PUT'])
def post_hardware():
    data = request.json

    filt = {"room_id": data["room_id"]}
    query = building.find(filt)
    query["current"] += data["status"]
    query["light"] = data["light"]
    query["alert"] = data["alert"]
    query["temp"] = data["temp"]

    if query["current"] < 0:
        query["current"] = 0

    building.update_one(query)

    return {"message": "update complete!"}


@app.route('/', methods=['GET'])
def get_data():
    building_data = building.find()
    result = []
    for build in building_data:
        for data in build["building"]:
            result.append({
                "floor_number": data["floor_number"],
                "rooms": data["rooms"]
            })
    return {"building": result}


@app.route('/', methods=['PUT'])
@jwt_required()
def update_data():
    data = request.json
    data_id = ObjectId('602fc8b704a4d40008221a69')

    building.update_one({'_id': data_id}, {
        '$set': {'building': data['building']}
    })

    return {"message": "Update complete"}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='3000', debug=True)
