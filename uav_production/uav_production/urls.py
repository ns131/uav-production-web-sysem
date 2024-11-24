from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Admin paneli URL'si 
    path('admin/', admin.site.urls),

    path('api/employees/', include('employees.urls')),  # Employees modülü
    #path('api/teams/', include('teams.urls')),        # Teams modülü
    #path('api/products/', include('products.urls')),  # Products modülü
    #path('api/inventory/', include('inventory.urls')), # Inventory modülü
    path('api/', include('authentication.urls')), # Authentication
]
