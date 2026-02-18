from django.shortcuts import render
# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from datetime import date
import requests
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from django.db import IntegrityError
from .models import Note
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import NoteSerializer, UserSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from app.models import User
from django.contrib.auth import get_user_model





@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello from Django"})


#@api_view(['POST'])
#def login_view(request):
#    username = request.data.get('username')
#    password = request.data.get('password')

#    user = authenticate(username = username, password = password)

#    if user:
#        return Response({"message": "Login successful" }, status = status.HTTP_200_OK)
#    else:
#        return Response({"message":"Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    


@api_view(['GET'])
@permission_classes([AllowAny])
def nip_lookup(request):
    nip = request.query_params.get('nip')

    if not nip or len(nip) !=10:
        return Response({"error": "Invalid NIP"}, status=400)
    
    today = date.today()
  

    
    url = f"https://wl-api.mf.gov.pl/api/search/nip/{nip}?date={today}"
    
    response = requests.get(url, timeout=5)

    if response.status_code != 200:
        return Response({"error": "External API error"}, status=502)
    
    data = response.json()
    subject = data.get("result", {}).get("subject")

    if not subject:
        return Response({"error": "Company not found"}, status=404)
    
    return Response({
        "name": subject.get("name"),
        "statusVat" : subject.get("statusVat"),
        "regon": subject.get("regon"),
        "workingAddress":subject.get("workingAddress"),
        "nip": subject.get("nip")
    })

@permission_classes([AllowAny])
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(
                    {"message": "User created successfully"},
                    status=status.HTTP_201_CREATED
                )
            except IntegrityError:
                return Response(
                    {"error": "User with this username or NIP already exists"},
                    status=status.HTTP_409_CONFLICT
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(user=user).order_by('-created_at')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_note(request):
    user= request.user
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE']) 
@permission_classes([IsAuthenticated])
def note_detail(request, note_id):
    try:
        note = Note.objects.get(id=note_id, user=request.user)
    except Note.DoesNotExist:
        return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "PUT":

        serializer = NoteSerializer(note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        note.delete()
        return Response({"message": "Deleted"}, status=status.HTTP_200_OK)






User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many= True)
    return Response(UserSerializer(users, many=True).data)


User = get_user_model()

class DeleteOwnAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        username = user.username
        user.delete()
        return Response(
            {"message": f"User {username} deleted successfully"}, status=status.HTTP_200_OK

        )