'''
copy pasta for api request status 
'''
from flask_api import status
'''
100's
'''

'''
200's
'''
STANDARD_200 = {'status' : status.HTTP_200_OK}
STANDARD_201 = {'status' : status.HTTP_201_CREATED}
STANDARD_202 = {'status' : status.HTTP_202_ACCEPTED}
'''
300's
'''

'''
400's
'''
STANDARD_400 = {'status' : status.HTTP_400_BAD_REQUEST}
EMPTY_400 = { 'status' : status.HTTP_400_BAD_REQUEST,
              'more_info' : 'empty request'}
STANDARD_401 = {'status' : status.HTTP_401_UNAUTHORIZED}
STANDARD_404 = {'status' : status.HTTP_404_NOT_FOUND}
STANDARD_408 = {'status' : status.HTTP_408_REQUEST_TIMEOUT}

'''
500's
'''