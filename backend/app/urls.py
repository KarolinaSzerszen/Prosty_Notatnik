from django.urls import path
from .views import hello
from .views import  nip_lookup, RegisterView, get_notes, add_note, update_note
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)




    




urlpatterns = [
    path('hello/', hello),
    #path('login/', login_view),
    path('nip/', nip_lookup),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('notes/', get_notes, name='get_notes'),
    path('notes/add/', add_note, name='add_note'),
    path('notes/<int:note_id>/', update_note, name='update_note')
]

