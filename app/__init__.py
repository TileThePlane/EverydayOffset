from flask import Flask
from app.dashboard.views import dashboard

app = Flask(__name__)
app.register_blueprint(dashboard)