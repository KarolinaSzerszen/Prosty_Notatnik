from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings



# Create your models here.



class User(AbstractUser):

    nip = models.CharField(max_length=10, unique=True)
    status_vat = models.CharField(max_length = 50, blank=True)
    regon = models.CharField(max_length=14, blank=True)
    working_address = models.CharField(max_length=255, blank=True)


class Note(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name = "notes"
    )
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def _str_(self):
        return f"{self.title} ({self.user.username})"