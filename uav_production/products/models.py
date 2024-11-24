from django.db import models
#from employees.models import Employee

class Product(models.Model):  # İHA çeşitleri
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    quantity = models.PositiveIntegerField(default=0)  # Envanterde olan miktar

    def __str__(self):
        return f"{self.name} - {self.quantity}"

class Assembly(models.Model): # Montajı yapılan İHA'lar
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name="assemblies")
    assembly_date = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('employees.Employee', on_delete=models.SET_NULL, null=True, related_name="assemblies")

    def __str__(self):
        return f"{self.product.name} - {self.assembly_date}"

class Part(models.Model):  # İHA Parça Çeşitleri
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    ### quantity = models.PositiveIntegerField(default=0)  # Stokta olan miktar

    def __str__(self):
        return f"{self.name}"

class PartProduction(models.Model): # Üretimi yapılan parçalar
    part = models.ForeignKey(Part, on_delete=models.PROTECT, related_name='productions')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, null=True, related_name='productions')
    employee = models.ForeignKey('employees.Employee', on_delete=models.SET_NULL, null=True, related_name='productions')
    production_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=1, default='R', blank=True) # U: Used, R: Ready, D: Deleted
    deleted_date = models.DateField(null=True, blank=True) # Geri dönüşüme giderse
    assembly = models.ForeignKey(
        Assembly, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name="pieces"
    ) # Parçanın kullanıldığı İHA 
    
    def __str__(self):
        return f"{self.part.name} - {self.product.name} ({self.production_date.date()})"