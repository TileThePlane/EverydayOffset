from flask import Flask
from app.myoffsets.calls import myoffsets
from app.lifetimeoffset.calls import lifetimeoffset
from app.npofinder.calls import npofinder
from app.offsetstore.calls import offsetstore

app = Flask(__name__)
app.register_blueprint(myoffsets)
app.register_blueprint(lifetimeoffset)
app.register_blueprint(npofinder)
app.register_blueprint(offsetstore)