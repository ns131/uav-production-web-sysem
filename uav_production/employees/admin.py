from django.contrib import admin
from .models import Employee

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    # Liste görünümünde gösterilecek sütunları tanımlayın
    list_display = ('first_name', 'last_name', 'email', 'team', 'birth_date', 'hire_date')
    # Liste görünümünde arama yapmayı sağlayan alanlar
    search_fields = ('first_name', 'last_name', 'email')
    # Filtreleme alanları
    list_filter = ('team', 'hire_date')
    # Sıralama (opsiyonel)
    ordering = ('last_name', 'first_name')