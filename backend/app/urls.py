from django.urls import path, include
from django.contrib import admin
from .views import hello
from .views import  nip_lookup, RegisterView, get_notes, add_note, note_detail, list_users, DeleteOwnAccountView
from rest_framework_simplejwt.views import(   TokenObtainPairView,
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
    path('notes/<int:note_id>/', note_detail, name='update_note or delete_note'),
    path('loginas/', include('loginas.urls')),
    path('admin/', admin.site.urls),
    path('users/', list_users, name='list_users'),
    path('users/delete-me/', DeleteOwnAccountView.as_view(), name='delete_own_account')
   
]

