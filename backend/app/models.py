from django.db import models
from django.contrib.auth.models import AbstractUser



# Create your models here.



class User(AbstractUser):

    nip = models.CharField(max_length=10, unique=True)
    status_vat = models.CharField(max_length = 50, blank=True)
    regon = models.CharField(max_length=14, blank=True)
    working_address = models.CharField(max_length=255, blank=True)