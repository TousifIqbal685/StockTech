from django.urls import path


from .view import *

urlpatterns = [
    path('marketData/', market_data),
    path('bullbear/<str:code>', bullbear),
    path('news/', news),
    path('indices/',indices),
    path('sectorwise/',sectorwise),
    path('companyprofile/<str:code>',companyprofile),
    path('price/<str:code>/<str:dateFrom>',price),
    path('companyNews/<str:code>',companyNews),
    path('SMA50/<str:code>/<str:dateFrom>',SMA50),
    path('EMA50/<str:code>/<str:dateFrom>',EMA50),
    path('MACD/<str:code>/<str:dateFrom>',MACD),
    path('STOCH/<str:code>/<str:dateFrom>',STOCH),
    path('RSI/<str:code>/<str:dateFrom>',RSI),
    path('BB/<str:code>/<str:dateFrom>',BB)

]