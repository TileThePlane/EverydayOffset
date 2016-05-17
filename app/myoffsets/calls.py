from flask import Blueprint, request, jsonify
from app.models import status, users, offsets
from pymongo import MongoClient

client = MongoClient('localhost', 27017) #connects to local instance of MongoDB server
db=client.test

myoffsets = Blueprint('myoffsets', __name__)

@myoffsets.route('/myoffsets/<user_id>', methods=['GET'])
def myoffset(user_id = ''):
    collection = client.users
    user_data = db.users.find_one({'user_id':user_id})
    if user_data:#add some field that can use to uniquely ID users, for now password
        del user_data['_id']
        return jsonify({'status' : status.STANDARD_200,
                                'user_data' : user_data})
        
    return jsonify({'status':status.STANDARD_404.update({'request_key' : 'user_pass',
                                                   'request_value' : user_pass})})
    
@myoffsets.route('/myoffsets/view=<offset_id>', methods=['POST','GET'])
def myoffsets_myoffset(offset_id = ''):
    '''
    Let me know what your POST will look like
    '''
    collection = client.offsets
    print(db.offsets.find_one({'offset_id' : offset_id}))
    if not offset_id:
            return jsonify({'status': status.EMPTY_400.update({'request_key' : 'offset_id'})})
    if request.method == 'GET':
        if offset_id == 'new':
            '''add in Andrews deets from API plan'''
            pass
        offset = db.offsets.find_one({'offset_id' : offset_id})
        if offset:
            del offset['_id']
            return jsonify({'status' : status.STANDARD_200,
                            'offset' : offset})
        return jsonify({'status':status.STANDARD_404.update({'request_key' : 'offset_id',
                                                   'request_value' : offset_id})}) 
        
    elif request.method == 'POST':
        pass
    
    
