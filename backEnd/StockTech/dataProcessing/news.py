import requests
 
secret = "138d1b34e8db427399d77da1cf33dfd8"
  
url = 'https://newsapi.org/v2/everything?'
  
def get_news():
    parameters = {
    'q': 'Dhaka Stock Exchange', 
    'pageSize': 100,  
    'apiKey': secret 
    }

    response = requests.get(url,params = parameters)
    response_json = response.json()
    return response_json