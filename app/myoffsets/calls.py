from flask import Blueprint, request, jsonify
from app.models import status, users, offsets
from pymongo import MongoClient

client = MongoClient('localhost', 27017) #connects to local instance of MongoDB server

myoffsets = Blueprint('myoffsets', __name__)

@myoffsets.route('/myoffsets/<user_pass>', methods=['GET'])
def myoffset(user_pass = ''):
    db = client.users
    user_data = db.users.find_one({'password' : user_pass})
    if user_data:#add some field that can use to uniquely ID users, for now password
        return jsonify({'status' : status.STANDARD_200,
                                'user_data' : user_data})
    return jsonify({'status':status.STANDARD_404.update({'request_key' : 'user_pass',
                                                   'request_value' : user_pass})})
    
@myoffsets.route('/myoffsets/<offset_name>', methods=['POST','GET'])
def myoffsets_myoffset(offset_name = ''):
    '''
    Let me know what your POST will look like
    '''
    db = client.offsets
    if request.method == 'GET':
        if not offset_name:
            return jsonify({'status': status.EMPTY_400.update({'request_key' : 'offset_name'})})
        if offset_name == 'new':
            '''add in Andrews deets from API plan'''
            pass
        for offset in offsets.offsets:
            if offset['offset_id'] == offset_name:
                return jsonify({'status' : status.STANDARD_200,
                                'offset' : offset})
        
        return jsonify({'status':status.STANDARD_404.update({'request_key' : 'offset_name',
                                                   'request_value' : offset_name})}) 
        
    if request.method == 'POST':
        pass
    
    
