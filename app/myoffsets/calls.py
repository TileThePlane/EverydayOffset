from flask import Blueprint, request, jsonify
from app.models import status, users, offsets

myoffsets = Blueprint('myoffsets', __name__)

@myoffsets.route('/myoffsets', methods=['GET'])
def myoffsets():
    return jsonify(users.users)

@myoffsets.route('/myoffsets/<offset_name>', methods=['POST','GET'])
def myoffsets_myoffset(offset_name = ''):
    '''
    Let me know what your POST will look like
    '''
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
    
    
