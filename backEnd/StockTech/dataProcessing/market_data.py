import requests
from datetime import datetime, timedelta
import json

class company_data:
    def __init__(self, full_name, ltp, closep, change, ycp, trading_code):
        self.full_name = full_name
        self.ltp = ltp
        self.closep = closep
        self.change = change
        self.ycp = ycp
        self.trading_code = trading_code

def get_market_data():
    arr = []
    response = requests.get(
        "https://www.amarstock.com/LatestPrice/34267d8d73dd?fbclid=IwAR3Nnl2tdnlEuJTOlZgH4yBuQR9ngbSg7y70e_kskcaWqwBfdqSkE7E8-II")

    for item in response.json():
        obj = company_data(item['FullName'], item['LTP'], item['Close'], item['Change'], item['YCP'], item['Scrip'])
        arr.append(obj.__dict__)

    return arr

def get_bullbear(request, code):
    # req=json.load(request)
    # code=req['code']
    response = requests.get(
        "https://www.amarstock.com/top/day/bullbear")
    items=response.json()
    item=items['AllBullBear']
    item1=item[0]
    bull=0
    bear=0
    neutral=0
    for item2 in item1:
        if(item2['Scrip']==code):
            if(item2['Status']=='BULL'):
                bull=item2['TotalVolume']
            elif(item2['Status']=='BEAR'):
                bear=item2['TotalVolume']
            elif(item2['Status']=='NEUTRAL'):
                neutral=item2['TotalVolume']
    return {'bull':bull,'bear':bear,'neutral':neutral}
