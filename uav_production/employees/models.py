from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from teams.models import Team

class Employee(models.Model): # Personeller
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    #user_name = models.CharField(max_length=50)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, related_name="employees")
    email = models.EmailField(unique=True)
    birth_date = models.DateField(null=True, blank=True)  # Doğum tarihi
    hire_date = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
