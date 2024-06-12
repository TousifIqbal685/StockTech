import requests
import pandas as pd
import json
import os
import json
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf
from datetime import date, timedelta
import keras.models


PATH = 'CNN'



def getPricePrediction(code,dateFrom):
    
    response = requests.get(f"https://www.amarstock.com/data/afe01cd8b512070a/?scrip={code}&cycle=Day1&dtFrom={dateFrom}T05%3A02%3A13.318Z&fbclid=IwAR0qZBhgiqSV6L6xTerlCEsXvVwtaLMaQvTqqMfUmjloMfBO2jocwV95DE8")
    if (response.status_code == 200):
        result = json.loads(response.text)


    return result




def get_pretrained_model(model_save_path):
    try:
        model = keras.models.load_model(model_save_path)
    except:
        model = None
    return model


def get_OBV(cp, volume):
    OBV = []
    OBV.append(0)
    for i in range(1, len(cp)):
        if cp[i] > cp[i - 1]:  # If the closing price is above the prior close price
            OBV.append(OBV[-1] + volume[i])  # then: Current OBV = Previous OBV + Current Volume
        elif cp[i] < cp[i - 1]:
            OBV.append(OBV[-1] - volume[i])
        else:
            OBV.append(OBV[-1])
    return OBV


def buy_sell(closing_price, obv, obv_ema):
    sigPriceBuy = []
    sigPriceSell = []
    flag = -1  # A flag for the trend upward/downward
    # Loop through the length of the data set
    for i in range(0, len(obv)):
        # if OBV > OBV_EMA  and flag != 1 then buy else sell
        if obv[i] > obv_ema[i] and flag != 1:
            sigPriceBuy.append(closing_price[i])
            sigPriceSell.append(-1)  # np.nan
            flag = 1
        # else  if OBV < OBV_EMA  and flag != 0 then sell else buy
        elif obv[i] < obv_ema[i] and flag != 0:
            sigPriceSell.append(closing_price[i])
            sigPriceBuy.append(-1)
            flag = 0
        # else   OBV == OBV_EMA  so append NaN
        else:
            sigPriceBuy.append(-1)
            sigPriceSell.append(-1)

    return sigPriceBuy, sigPriceSell




def jsonTOArray(last_100_days, scaler):
    l = []

    for days in last_100_days:
        l += [[days['Close'], days['Volume']]]

    #print(l)

    # scaler = MinMaxScaler(feature_range=(0,1))
    scaled_data = scaler.fit_transform(l)
    # scaled_data
    #print(scaled_data)
    np_array = np.array(scaled_data)
    np_array = np.reshape(np_array, (1, 25, 4, 2))

    return np_array, scaled_data


def load_model(code):
    # company_name = input()
    files = os.listdir(PATH)

    if "CNN_1.0_" + code not in files:

        return None
    else:
        model_save_path = f'{PATH}/CNN_1.0_{code}'
        model = get_pretrained_model(model_save_path)
        print(model_save_path)
        
    return model


def getFutureDates(n):
    one_day_delta = timedelta(1)
    day = date.today()
    days = []
    for i in range(n):
        day += one_day_delta
        days.append(day)

    return days


def getPredictions(model, np_array, scaler, scaled_data, n):
    predictions = []
    print(model(np_array))
    for i in range(n):
        print(i)
        prediction = np.reshape(model(np_array), (1, 2)) 

        scaled_data = np.append(scaled_data, prediction)

        scaled_data = np.reshape(scaled_data, (scaled_data.shape[0] // 2, 2))

        np_array = np.array(scaled_data[-100:, :])
        np_array = np.reshape(np_array, (1, 25, 4, 2))

        prediction = scaler.inverse_transform(prediction)
        predictions.append(prediction)
    

    
    predictions = np.array(predictions)
    predictions = np.reshape(predictions, (predictions.shape[0], predictions.shape[2]))

    days = getFutureDates(n)

    closing_price = predictions[:, 0]
    volume = predictions[:, 1]

    obv = get_OBV(closing_price, volume)
    obv_ema = pd.Series(obv).ewm(com=20).mean()

    sigPriceBuy, sigPriceSell = buy_sell(closing_price, obv, obv_ema)

    return closing_price, obv, days, sigPriceBuy, sigPriceSell, obv_ema


def getPrediction(request, code, dateFrom):
    n=30
    # req=json.load(request)
    # code=req['code']
    # dateFrom=req['dateFrom']
    last_100_days=getPricePrediction(code,dateFrom)[-100:]
    #last_100_days=getPricePrediction(code,dateFrom)[:-40]
    #last_100_days = last_100_days[-100:]
    df = pd.DataFrame(last_100_days)
    df.to_csv('output.csv', index=False)
    
    #print(last_100_days)
    
    if len(last_100_days) != 100:
        print("hehe")
        return 0
    else:
        print("GG")

    
    scaler = MinMaxScaler(feature_range=(0, 1))
    
    np_array, scaled_data = jsonTOArray(last_100_days, scaler)
    
    # print(np_array)
    model = load_model(code)
    
    if model == None:
        print("haha")
        return 0
    
    print("hohooooooooooo")
    closing_price, obv, days, sigPriceBuy, sigPriceSell, obv_ema = getPredictions(model, np_array, scaler, scaled_data,
                                                                                  n)

    # print(closing_price, obv, days)

    return {
        "closing_price": closing_price,
        "days": days
    }

