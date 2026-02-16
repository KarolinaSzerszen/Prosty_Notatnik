from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from .models import Note

class RegisterSerializer(serializers.ModelSerializer):
    passwordSecond = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "nip", "status_vat", "regon", "working_address", "password", "passwordSecond"]

    def validate(self,data):
            if data['password'] != data['passwordSecond']:
                raise serializers.ValidationError({"password": "Passwords do not match"})
            return data
        
    def create(self, validated_data):
            validated_data.pop('passwordSecond')
            user = User.objects.create_user(
                username=validated_data["username"],
                password=validated_data["password"],
                nip=validated_data.get('nip',''),
                status_vat=validated_data.get('status_vat',''),
                regon=validated_data.get('regon',''),
                working_address=validated_data.get('working_address','')
            )
            return user
                                   
    
class NoteSerializer(serializers.ModelSerializer):
        class Meta:
            model = Note
            fields = ["id", "title", "content", "created_at", "updated_at"]
            
