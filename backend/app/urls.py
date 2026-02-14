from django.urls import path
from .views import hello
from .views import login_view, nip_lookup, RegisterView


urlpatterns = [
    path('hello/', hello),
    path('login/', login_view),
    path('nip/', nip_lookup),
    path('register/', RegisterView.as_view(), name='register')
]

