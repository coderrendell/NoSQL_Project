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
    # Define the product launch date (replace with your actual product launch date)
    product_launch_date = datetime(2023, 1, 1)

    # Calculate the date 90 days after the product launch
    ninety_days_after_launch = product_launch_date + timedelta(days=90)

    # MongoDB aggregation pipeline to analyze review data and product prices
    pipeline = [
        {
        '$match': {
            'reviews.date': {
                '$gte': product_launch_date,
                '$lt': ninety_days_after_launch
            }
        }
    },
    {
        '$project': {
            'id': 1,
            'reviews.date': 1,
            'reviews.rating': 1,
            'price': 1  # Replace 'price' with your actual field name for product price
            # Add other fields as needed for analysis
        }
    },
    {
        '$group': {
            '_id': '$id',
            'avgPrice': {'$avg': '$price'},
            'avgRating': {'$avg': '$reviews.rating'},
            'count': {'$sum': 1}
        }
    },
    {
        '$project': {
            '_id': 1,
            'avgPrice': 1,
            'avgRating': 1,
            'count': 1
        }
    },
    {
        '$sort': {'avgPrice': 1}
    }
    ]

    # Execute the aggregation pipeline
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
                'average_helpful_votes': {'$avg': '$reviews.numHelpful'},
                'average_comments': {'$avg': '$reviews.numComments'},
                'average_rating': {'$avg': '$reviews.rating'}
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
