from flask import Blueprint, request, jsonify
from app.models import status, users, offsets
from pymongo import MongoClient

client = MongoClient('localhost', 27017) #connects to local instance of MongoDB server
db=client.test

web_requests = Blueprint('web_requests', __name__)

@web_requests.route('/postoffset/<offset_id>', methods=['POST'])
def postoffset(offset_id = ''):
    if request.method == 'GET':
        collection = client.offsets
        if db.offsets.find_one({"offset_id" : offset_id}):
            db.offsets.update_one({"offset_id": offset_id}, {'$inc' : {"counter" : 1}})
            return jsonify({'status' : status.STANDARD_200,
                                    'offset_id' : offset_id})
        else:
            return jsonify({'status':status.STANDARD_404.update({'request_key' : 'offset_id',
                                                       'request_value' : offset_id})})