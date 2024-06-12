import requests, json
import pandas as pd

def getProfile(request, code):
    # req=json.load(request)
    # code=req['code']
    
    response = requests.get(f"https://www.amarstock.com/data/1258dca00155/{code}?fbclid=IwAR02-1IuXiqgdsEtkfTnWEhPjUsX29tMcMSo_8iFx576_7xYG3r89_v9lQc")
    if (response.status_code == 200):
        result = json.loads(response.text)
    data={}
    data['Scrip']=result['Scrip']
    data['FullName']=result['FullName']
    data['LastTrade']=result['LastTrade']
    data['Volume']=result['Volume']
    data['ClosePrice'] = result['ClosePrice']
    data['Week1Close'] = result['Week1Close']
    data['Week52Close'] = result['Week52Close']
    data['Week52Range'] = result['Week52Range']
    data['OpenPrice'] = result['OpenPrice']
    data['YCP'] = result['YCP']
    data['MarketCap'] = result['MarketCap']
    data['Change'] = result['Change']
    data['TotalTrade'] = result['TotalTrade']
    data['AuthorizedCap'] = result['AuthorizedCap']
    data['PaidUpCap'] = result['PaidUpCap']
    data['TotalSecurities'] = result['TotalSecurities']
    data['ListingYear'] = result['ListingYear']
    data['MarketCategory'] = result['MarketCategory']
    data['ShareHoldingPercentage'] = result['ShareHoldingPercentage']
    data['SponsorDirector'] = result['SponsorDirector']
    data['Govt'] = result['Govt']
    data['Institute'] = result['Institute']
    data['Foreign'] = result['Foreign']
    data['Public'] = result['Public']
    data['Address'] = result['Address']
    data['Contact'] = result['Contact']
    data['Email'] = result['Email']
    data['Web'] = result['Web']
    data['Rating'] = result['Rating']
    data['DayRange'] = result['DayRange']
    data['EPS'] = result['EPS']
    data['AuditedPE'] = result['AuditedPE']
    data['DividentYield'] = result['DividentYield']
        
    return data

def getPrice(request, code, dateFrom):
    # req=json.load(request)
    # code=req['code']
    # dateFrom=req['dateFrom']
    response = requests.get(f"https://www.amarstock.com/data/afe01cd8b512070a/?scrip={code}&cycle=Day1&dtFrom={dateFrom}T05%3A02%3A13.318Z&fbclid=IwAR0qZBhgiqSV6L6xTerlCEsXvVwtaLMaQvTqqMfUmjloMfBO2jocwV95DE8")
    result = json.loads(response.text)   
    df=pd.DataFrame(result)
    my_array = df['DateEpoch'].values
    date=my_array.astype(str).tolist()
    close = df['Close'].values
    open = df['Open'].values
    high = df['High'].values
    low = df['Low'].values
    return {'date':date,'close':close,'open':open,'high':high,'low':low}



def getCompanyNews(request, code):
    # req=json.load(request)
    # code=req['code']
    all_json_list = {}
    all_json_list["news"] = []
    response = requests.get(f"https://www.amarstock.com/data/1258dca00155/{code}?fbclid=IwAR02-1IuXiqgdsEtkfTnWEhPjUsX29tMcMSo_8iFx576_7xYG3r89_v9lQc")
    if (response.status_code == 200):
        result = json.loads(response.text)
    
        jdata = {}
        title = ''
        body = ''
        for x in result:
            if "news" in x and "title" in x:
                title = x
            elif "news" in x and "body" in x:
                body = x

            if title != '' and body != '':
                jdata = {

                    "title": result[title],
                    "body": result[body],

                }
                all_json_list["news"].append(jdata)
                title = ''
                body = ''


    return all_json_list

    