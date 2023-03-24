from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Create your views here.
class SSTView(APIView):
    def get(self, request, season):
        # Checks if the season entered is valid.
        if (season.lower() != 'spring' and season.lower() != 'summer' and season.lower() != 'fall' and season.lower() != 'winter'):
            return Response({'status': 'error'})
        else:
            return Response({'season entered': season.lower()})