import json
import requests

class indices:
    def __init__(self, DSEX, DSES, DS30):
        self.dsex=DSEX
        self.dses=DSES
        self.ds30=DS30

def getIndices():

    response = requests.get(
        "https://www.amarstock.com/data/lastIndexEx")
    response=response.json()
    obj= indices(response["00DSEX"],response["00DSES"],response["00DS30"])
    return obj.__dict__
