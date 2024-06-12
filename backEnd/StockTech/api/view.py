import sys
import os
from django.shortcuts import render

sys.path.append("..")

# Create your views here.
from rest_framework import status
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

from dataProcessing.market_data import *
from dataProcessing.news import *
from dataProcessing.dseindices import *
from dataProcessing.sectorwiseGL import *
from dataProcessing.companyProfile import *
from dataProcessing.technicalIndicators import *


@api_view(['GET'])
def market_data(request):
    return Response(data=get_market_data())

@api_view(['GET'])
def news(request):
    return Response(data=get_news())

@api_view(['GET'])
def bullbear(request, code):
    return Response(data=get_bullbear(request, code))

@api_view(['GET'])
def SMA50(request, code, dateFrom):
    return Response(data=getSMA(request, code, dateFrom))

@api_view(['GET'])
def EMA50(request, code, dateFrom):
    return Response(data=getEMA(request, code, dateFrom))

@api_view(['GET'])
def STOCH(request, code, dateFrom):
    return Response(data=getSTOCH(request, code, dateFrom))

@api_view(['GET'])
def MACD(request, code, dateFrom):
    return Response(data=getMACD(request, code, dateFrom))

@api_view(['GET'])
def BB(request, code, dateFrom):
    return Response(data=getBB(request, code, dateFrom))

@api_view(['GET'])
def RSI(request, code, dateFrom):
    return Response(data=getRSI(request, code, dateFrom))

@api_view(['GET'])
def indices(request):
    return Response(data=getIndices())

@api_view(['GET'])
def companyprofile(request, code):
    return Response(data=getProfile(request, code))

@api_view(['GET'])
def price(request, code, dateFrom):
    return Response(data=getPrice(request, code, dateFrom))


@api_view(['GET'])
def companyNews(request, code):
    return JsonResponse(data=getCompanyNews(request, code))


@api_view(['GET'])
def sectorwise(request):
    return Response(data=getSectorwise())


