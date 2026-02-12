from django.urls import path
from .views import hello
from .views import login_view

urlpatterns = [
    path('hello/', hello),
    path('login/', login_view)
]

