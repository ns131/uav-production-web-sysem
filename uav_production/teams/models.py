from django.db import models
#from employees.models import Employee
from products.models import Part

class Team(models.Model):  # Takımlar
    name = models.CharField(max_length=100, unique=True) # Örneğin: "Kanat Takımı"
    description = models.TextField(null=True, blank=True)
    part = models.OneToOneField(
        Part, null=True, blank=True, on_delete=models.SET_NULL, related_name="team"
    )  # Her takım bir parçadan sorumlu olabilir
    is_assembly = models.BooleanField(default=False)  # Montaj takımı olup olmadığını belirler

    def __str__(self):
        if self.is_assembly:
            return f"{self.name} (Montaj Takımı)"
        return f"{self.name} ({self.part.name if self.part else 'Tanımsız Takım'})"
