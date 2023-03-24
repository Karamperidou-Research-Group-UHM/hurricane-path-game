from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .getData import getSSTData

# Create your views here.
class SSTView(APIView):
    def get(self, request, season):
        # Checks if the season entered is valid.
        if (season.lower() != 'spring' and season.lower() != 'summer' and season.lower() != 'fall' and season.lower() != 'winter'):
            return Response({'status': 'error'})
        else:
            # Computes the sst data for the specific season given from lon 120 to -120 and lat 80 to -60.
            sst_data = getSSTData(season)
            return Response(sst_data)