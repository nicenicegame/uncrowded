from flask import Flask, request
from flask_pymongo import PyMongo
from datetime import date

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://exceed_group11:2grm46fn@158.108.182.0:2255/exceed_group11'
mongo = PyMongo(app)

myCollection = mongo.db.g11

@app.route('/hello', methods=['GET'])
def hello():
    return {"message": "Hello World!"}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='3000', debug=True)