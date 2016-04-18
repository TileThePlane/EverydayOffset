from flask import Blueprint, request, jsonify

myoffsets = Blueprint('myoffsets', __name__)

@myoffsets.route('/myoffsets', methods=['GET'])
def show_myoffsets():
    return jsonify({'offsets' : {
                                 'offset1' : {
                                              'name' : 'fridge offset',
                                              'active' : True,
                                              'date_registered' : '2016-03-15',
                                              'donation_amount' : 0.5,
                                              'type' : 'physical',
                                              'trigger' : 'Opening a refridgerator door.',
                                              'designer' : 'Everyday Offset',
                                              'total_donations' : 200                      
                                                },
                                 'offset2' : {
                                              'name' : 'lamp offset',
                                              'active' : True,
                                              'date_registered' : '2016-02-13',
                                              'donation_amount' : 0.02,
                                              'type' : 'physical',
                                              'trigger' : 'Ever second an electrical device is powered.',
                                              'designer' : 'Everyday Offset',
                                              'total_donations' : 4435                      
                                                },
                                 'offset3' : {
                                              'name' : 'netflix offset',
                                              'active' : True,
                                              'date_registered' : '2016-02-02',
                                              'donation_amount' : 0.02,
                                              'type' : 'virtual',
                                              'trigger' : 'Ever minute that netflix is watched.',
                                              'designer' : 'Everyday Offset',
                                              'total_donations' : 2435                      
                                                },
                                }
                   })

@myoffsets.route('/myoffsets/<offset_name>', methods=['POST'])
def modify_myoffsets():
    '''
    Let me know what your POST will look like
    '''
    pass
