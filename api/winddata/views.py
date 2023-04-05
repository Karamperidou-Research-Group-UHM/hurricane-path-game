from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .getWindData import get_wind_direction_data

# Create your views here.
class WindDataView(APIView):
    def get(self, request, season):
        '''Returns a json of all wind direction data for latitude points: 70 to -30 and 
            longitude points: 110 to -125 for the season given.'''

        # Checks if the correct season was given.
        if (season.lower() != 'spring' and season.lower() != 'summer' and season.lower() != 'fall' and season.lower() != 'winter'):
            # Returns an error response.
            return Response({'status': 'error'})
        else:
            # Gets the wind direction data for each lat and lon and returns it as a JSON response.
            wind_direction_data = get_wind_direction_data(season.lower())
            return Response(wind_direction_data)
