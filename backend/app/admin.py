from django.contrib import admin
from .models import User, Note
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    change_form_template='loginas/change_form.html'


admin.site.register(User, CustomUserAdmin)
admin.site.register(Note)



# Register your models here.
