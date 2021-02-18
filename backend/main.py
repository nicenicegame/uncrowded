from flask import Flask, request
from flask_pymongo import PyMongo
from datetime import date

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://exceed_group11:2grm46fn@158.108.182.0:2255/exceed_group11'
mongo = PyMongo(app)

building = mongo.db.building

@app.route('/hardware', methods=['GET'])
def get_hardware():

    data = {
        "room_id": 201,
        "capacity": 20,
        "current" : 10,
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
    return {"data": result}

@app.route('/', methods=['PUT'])
def update_data():
    data = request.json
    
    building.update_one(data)

    return {"message": "insert complete!"}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='3000', debug=True)