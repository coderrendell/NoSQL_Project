

from flask import Flask, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS  # Import the CORS module


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=False)  # Enable CORS and set origins to "*"


# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['KIndle_Review']  # Replace 'your_database_name' with your actual database name
collection = db['Amazon']

@app.route('/')
def hello_world():
    return jsonify(message='Hello, World!')

@app.route('/query', methods=['GET'])
def get_data_from_mongo():
    # Query MongoDB collection
    object_id = ObjectId("6559493a9445ff8eba80bd6a")

    data_from_mongo = collection.find_one({'_id': object_id}, {'_id': 0})

    print(data_from_mongo)


    return jsonify(data=data_from_mongo)

if __name__ == '__main__':
    app.run(debug=True)
