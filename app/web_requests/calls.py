from flask import Blueprint, request, jsonify
from app.models import status
from pymongo import MongoClient
import time

client = MongoClient('localhost', 27017) #connects to local instance of MongoDB server
db = client.test

web_requests = Blueprint('web_requests', __name__)

@web_requests.route('/postoffset/<offset_id>', methods=['POST'])
def postoffset(offset_id = ''):
    db = client.test
    offset = db.offsets.find_one({'offset_id' : offset_id})
    try:
        if offset['activated'] == True:
            db.offsets.update({'offset_id' : offset_id}, {'$inc' : { 'counter' : 1 }})
            db.offsets.update({'offset_id' : offset_id}, {'$push' : { "offset_events" : {'donation_amount' : offset['donation_amount'],
                                                                                            'npo' : offset['npo'],
                                                                                            'data_time_stamp' : int(time.time()) }}})
            return jsonify({'status' : status.STANDARD_200,
                            'offset_id' : offset_id})
    #raised if offset_id not found in database
    except TypeError, KeyError:
        pass
    return jsonify({'status':status.STANDARD_404.update({'request_key' : 'offset_id',
                                           'request_value' : offset_id})})
    
@web_requests.route('/createoffset/<user_id>=<offset_id>', methods=['POST'])
def createoffset(user_id = '', offset_id = ''):
    pass
