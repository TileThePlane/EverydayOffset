import flask
from app.dashboard.models import USERS
from json import dumps
dashboard = flask.Blueprint('splash', __name__)

@dashboard.route('/')
@dashboard.route('/hello')
def dashboardMain():
    return USERS['default']

@dashboard.route('/show/<key>/<value>')
def getMessage(key, value):
    '''
    shows json doc where <value> = <key>
    '''
    userMatch = ''
    for user in USERS:
        for ukey in user.keys():
            if ukey == key:
                try:
                    if user[ukey] == value:
                        userMatch = user 
                    else:
                        userMatch = 'value did not match a key'
                except KeyError:
                    '''
                    raise if <key> not in USERS
                    '''
                    userMatch = 'KeyNot Found'
    return flask.render_template('home.html',dumps(userMatch)) 

@dashboard.route('/add/<key>=<value>')
def addKey(key, value):
    '''
    Add a key and value
    '''
    USERS[key] = value
    return key + ' = "' + value + '" has been added.'
