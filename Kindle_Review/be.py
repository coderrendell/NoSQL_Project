from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=False)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['KIndle_Review']
collection = db['Amazon']

# Task 1: How do the reviews in the first 90 days after a product launch compare to the price of the product?
@app.route('/task1', methods=['GET'])
def task1():
    # Calculate date 90 days ago from today
    date_90_days_ago = datetime.now() - timedelta(days=90)

    # MongoDB aggregation pipeline to analyze review data and product prices
    pipeline = [
        {
            '$match': {
                'reviews.date': {'$gte': date_90_days_ago}
            }
        },
        {
            '$group': {
                '_id': None,
                'average_price': {'$avg': '$price'},
                'average_rating': {'$avg': '$reviews.rating'}
                # Add other aggregations as needed
            }
        },
        {
            '$project': {
                '_id': 0
            }
        }
    ]

    # Execute the aggregation pipeline
    result = list(collection.aggregate(pipeline))

    return jsonify(result=result)
# Task 2: Customer Engagement - Examine the number of helpful votes for reviews from different cities
@app.route('/task2', methods=['GET'])
def task2():
    city = request.args.get('city')  # Get city parameter from query string

    # Query MongoDB collection for reviews from the specified city
    reviews_from_city = collection.find({
        'user.City': city
    })

    # Implement your logic to analyze helpful votes and engagement for reviews from the specified city
    # ...

    return jsonify(result=f'Task 2 completed for city: {city}')

# Task 3: Customer Behavior Segmentation - Segment customers based on ratings, recommendations, and number of helpful votes
@app.route('/task3', methods=['GET'])
def task3():
    # Query MongoDB collection to get customer behavior data
    customer_behavior_data = collection.find({}, {
        'reviews.rating': 1,
        'reviews.doRecommend': 1,
        'reviews.numHelpful': 1
    })

    # Implement your logic to segment customers based on ratings, recommendations, and helpful votes
    # ...

    return jsonify(result='Task 3 completed')

if __name__ == '__main__':
    app.run(debug=True)
