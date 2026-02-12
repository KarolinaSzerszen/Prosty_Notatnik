from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello from Django"})


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username = username, password = password)

    if user:
        return Response({"message": "Login successful" }, status = status.HTTP_200_OK)
    else:
        return Response({"message":"Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)