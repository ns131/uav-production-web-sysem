from rest_framework import serializers
from employees.models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')  # User modelinin username alanı

    class Meta:
        model = Employee  # Hangi modelin serileştirileceğini belirtir
        fields = ['id', 'first_name', 'last_name', 'email', 'birth_date', 'hire_date', 'team', 'username']
