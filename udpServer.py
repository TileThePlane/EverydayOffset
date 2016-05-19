import socket
import time
from pymongo import MongoClient

client = MongoClient('localhost', 27017) #connects to local instance of MongoDB server
db = client.test

port = 1023
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind(("", port))
print "waiting on port:", port
while 1:
    offset_id, addr = s.recvfrom(1024)
    offset = db.offsets.find_one({'offset_id' : offset_id})
    try:
        print(offset)
        if offset['activated'] == True:
            db.offsets.update({'offset_id' : offset['offset_id']}, {'$inc' : { 'counter' : 1 }})
            db.offsets.update({'offset_id' : offset['offset_id']}, {'$push' : { 'offset_event' : {'donation_amount' : offset['donation_amount'],
                                                                          'npo' : offset['npo'],
                                                                          'data_time_stamp' : int(time.time()) }}})
    #raised if offset_id not found in database
    except TypeError, KeyError:
        pass
