from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
from flask_cors import cross_origin
from datetime import datetime, timedelta


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=False)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['KindleReview']
collection = db['Amazon']

# Task 1: How do the reviews in the first 90 days after a product launch compare to the price of the product?
# Task 1: How do the reviews in the first 90 days after a product launch compare to the price of the product?
@app.route('/task1', methods=['GET'])
def task1():
    pipeline = [
        {
            '$match': {
                'launch.price': {'$exists': True},
                '90days.price': {'$exists': True}
            }
        },
        {
            '$group': {
                '_id': '$name',  # Grouping by product name
                'launch_price': {'$first': '$launch.price'},  # Get the launch price
                'price_after_90_days': {'$first': '$90days.price'}  # Get the price after 90 days
            }
        }
    ]

    result = list(collection.aggregate(pipeline))

    return jsonify(result=result)

# Task 2: Customer Engagement - Examine the number of helpful votes for reviews from different cities
@app.route('/task2', methods=['GET'])
def task2():
    # MongoDB aggregation pipeline for examining customer engagement
    pipeline = [
        {
            '$match': {
                'reviews.numHelpful': {'$exists': True},  # Filter documents where reviews.numHelpful exists
                'user.City': {'$exists': True}  # Filter documents where user.City exists
            }
        },
        {
            '$group': {
                '_id': '$user.City',  # Grouping by city
                'average_helpful_votes': {'$sum': '$reviews.numHelpful'},
                'average_rating': {'$sum': '$reviews.rating'}
                # Add more aggregations or metrics as needed
            }
        },
        {
            '$sort': {'average_helpful_votes': -1}  # Sort by average helpful votes (descending)
        }
    ]

    # Execute the aggregation pipeline
    result = list(collection.aggregate(pipeline))

    # Return the result as a JSON response
    return jsonify(result=result)

# Task 3: Customer Behavior Segmentation - Segment customers based on ratings, recommendations, and number of helpful votes
@app.route('/task3', methods=['GET'])
@cross_origin()
def task3():
    # MongoDB aggregation pipeline for customer behavior segmentation
    pipeline = [
        {
            '$match': {
                'reviews.rating': {'$exists': True},  # Filter documents where reviews.rating exists
                # Add more filters as needed
            }
        },
        {
            '$project': {
                'rating': '$reviews.rating'
                # Add more fields as needed for customer segmentation
            }
        },
        {
            '$group': {
                '_id': None,
                'HighlySatisfied': {'$sum': {'$cond': [{'$gte': ['$rating', 4]}, 1, 0]}},
                'Satisfied': {'$sum': {'$cond': [{'$eq': [{'$and': [{'$gte': ['$rating', 3]}, {'$lt': ['$rating', 4]}]}, True]}, 1, 0]}},
                'Neutral': {'$sum': {'$cond': [{'$eq': [{'$and': [{'$gte': ['$rating', 2]}, {'$lt': ['$rating', 3]}]}, True]}, 1, 0]}},
                'Unsatisfied': {'$sum': {'$cond': [{'$lt': ['$rating', 2]}, 1, 0]}}
                # Define conditions and use $cond operator to categorize ratings
            }
        }
    ]

    # Execute the aggregation pipeline
    result = list(collection.aggregate(pipeline))

    # Return the result as a JSON response
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)
