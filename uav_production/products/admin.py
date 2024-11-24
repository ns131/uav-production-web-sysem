from django.contrib import admin
from .models import Product
from .models import Assembly
from .models import Part
from .models import PartProduction

admin.site.register(Product)
admin.site.register(Assembly)
admin.site.register(Part)
admin.site.register(PartProduction)
