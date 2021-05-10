from flask import jsonify

def readServices():
    with open('services.json', 'r') as file:
        rawJSON = file.read()
        print(jsonify(rawJSON))
        file.close()

readServices()