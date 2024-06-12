import pandas as pd
import ta,json,requests,os

def fetchData(request, code, dateFrom):
    # req=json.load(request)
    # code=req['code']
    # dateFrom=req['dateFrom']
    response = requests.get(f"https://www.amarstock.com/data/afe01cd8b512070a/?scrip={code}&cycle=Day1&dtFrom={dateFrom}T05%3A02%3A13.318Z&fbclid=IwAR0qZBhgiqSV6L6xTerlCEsXvVwtaLMaQvTqqMfUmjloMfBO2jocwV95DE8")
    result = json.loads(response.text)
    df=pd.DataFrame(result)
    return df

def getSMA(request, code, dateFrom):
    df=fetchData(request , code, dateFrom)
    sma = ta.trend.sma_indicator(df['Close'], window=50)
    df['SMA50']=sma
    my_array = df['DateEpoch'].values
    date=my_array.astype(str).tolist()
    sma = ta.trend.sma_indicator(df['Close'], window=200)
    df['SMA200']=sma
    df = df.fillna(0)
    return {'date':date,'sma50':df['SMA50'],'sma200':df['SMA200']}

def getEMA(request, code, dateFrom):
    df=fetchData(request, code, dateFrom)
    ema = ta.trend.ema_indicator(df['Close'], window=50)
    df['EMA50']=ema
    my_array = df['DateEpoch'].values
    date=my_array.astype(str).tolist()
    ema = ta.trend.ema_indicator(df['Close'], window=200)
    df['EMA200']=ema
    df = df.fillna(0)
    return {'date':date,'ema50':df['EMA50'],'ema200':df['EMA200']}

def getMACD(request, code, dateFrom):
    df=fetchData(request, code, dateFrom)
    macd = ta.trend.MACD(df['Close'])
    df['MACD'] = macd.macd()
    df['signal']=macd.macd_signal()
    my_array = df['DateEpoch'].values
    date=my_array.astype(str).tolist()
    df = df.fillna(0)
    return {'date':date,'macd':df['MACD'],'signal':df['signal']}


def getSTOCH(request, code, dateFrom):
    df=fetchData(request, code, dateFrom)
    stoch = ta.momentum.StochasticOscillator(high=df['High'], low=df['Low'], close=df['Close'], window=14, smooth_window=3)
    my_array = df['DateEpoch'].values
    date=my_array.astype(str).tolist()
    df['SlowK'] = stoch.stoch()
    df['SlowD'] = stoch.stoch_signal()
    df = df.fillna(0)
    return {'date':date,'K':df['SlowK'],'D':df['SlowD']}

def getBB(request, code, dateFrom):
    df=fetchData(request, code, dateFrom)
    bb = ta.volatility.BollingerBands(close=df['Close'], window=20, window_dev=2)
    df['UpperBB'] = bb.bollinger_hband()
    df['LowerBB'] = bb.bollinger_lband()
    df['MA_BB'] = (df['UpperBB'] + df['LowerBB']) / 2
    my_array = df['DateEpoch'].values
    date=my_array.astype(str).tolist()
    df = df.fillna(0)
    return {'date':date,'Upper':df['UpperBB'],'Lower':df['LowerBB'],'Middle':df['MA_BB']}

def getRSI(request, code, dateFrom):
    df=fetchData(request, code, dateFrom)
    rsi = ta.momentum.RSIIndicator(close=df['Close'], window=14)
    df['RSI'] = rsi.rsi()
    my_array = df['DateEpoch'].values
    array1=my_array.astype(str).tolist()
    last_50_elements = array1[-50:]
    array2 = df['RSI'].values
    last_50_elements2 = array2[-50:]
    key_value_dict = {}
    for i in range(len(last_50_elements)):
        key_value_dict[last_50_elements[i]] = last_50_elements2[i]
    return key_value_dict


