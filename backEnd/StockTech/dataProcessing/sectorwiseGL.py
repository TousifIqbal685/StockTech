import requests
import json

def getSectorwise():
    response = requests.get(
        "https://www.amarstock.com/info/sector/composition")

    return response.json()