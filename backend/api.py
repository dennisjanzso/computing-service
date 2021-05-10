from flask import Flask, redirect, url_for, request, send_file, jsonify, session
from flask_cors import CORS, cross_origin
import compute_service
import time
import json


app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)
app.secret_key = 'verySecretKey'


@app.route('/', methods=['GET'])
def home():
    rawJSON = ''
    with open('services.json', 'r') as file:
        rawJSON = json.load(file)
        file.close()
    #svc = jsonify(rawJSON)
    return rawJSON

@app.route('/get-processed-image', methods=['GET'])
def get_image():
    image_id = request.args.get('id')
    compute_service.check_image_processed(image_id)
    return send_file('data/p_' + image_id + '.png', mimetype='image/gif')

@app.route('/cleanup-processed-image', methods=['GET'])
def wipe_image():
    image_id = request.args.get('id')
    return compute_service.clear_data(image_id)

@app.route('/upload-image', methods=['POST'])
@cross_origin()
def upload_image():
    image_id = request.args.get('id')
    with open('data/' + image_id + '.png', 'wb') as file:
        file.write(request.data)
        file.close()
    compute_service.process_image(image_id)
    return "Image recieved"
    
app.run()
