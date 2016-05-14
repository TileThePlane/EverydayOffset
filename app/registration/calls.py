from flask import Blueprint, request, jsonify
from app.models import status, users, offsets
from pymongo import MongoClient

client = MongoClient('localhost', 27017) #connects to local instance of MongoDB server

myoffsets = Blueprint('registration', __name__)

@myoffsets.route('/register', methods=['POST'])