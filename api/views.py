from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json

from core.utils import filter_colleges

@api_view(['POST'])
def get_colleges(request):
    print(request.data)
    region = request.data["regionOption"]
    funding = request.data["fundingOption"]
    cost_option = request.data["costOption"]
    response = json.dumps(filter_colleges(region=region, funding_model=funding, average_cost = int(cost_option)))

    if len(response) > 0:
        return Response({"message": "Here is your list of colleges!", "colleges": response}, status = status.HTTP_200_OK)
    
    else:
        return Response({"message": "Looks like no colleges found by your arguments",}, status = status.HTTP_200_OK)
