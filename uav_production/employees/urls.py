from django.urls import path
from . import views


urlpatterns = [
    # api/employees/... 
    # path('', views.employee_list, name='employee_list'),
    path('', views.get_employees, name='employee_list'),
    path('create/', views.add_employee, name='add_employee'),
    path('delete/<int:employee_id>/', views.delete_employee, name='delete_employee'),

]