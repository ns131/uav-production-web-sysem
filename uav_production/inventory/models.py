from django.db import models
from products.models import Part
from products.models import Product

class PartInventory(models.Model):
    part = models.ForeignKey(Part, on_delete=models.PROTECT, related_name="inventory_items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='inventory_items')
    quantity = models.PositiveIntegerField(default=0)  # Stok miktarı
    recycled_quantity = models.PositiveIntegerField(default=0) # Geri dönüşüme gönderilen miktar

    def __str__(self):
        return f"{self.part.name} - {self.product.name} - {self.quantity} adet, {self.recycled_quantity} geri dönüşümde"

