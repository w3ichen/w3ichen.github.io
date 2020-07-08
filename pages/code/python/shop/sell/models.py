from django.db import models
from django.utils import timezone
from PIL import Image
from django.contrib.auth.models import User

class Product(models.Model):
	item = models.CharField(max_length=100, blank=False)
	price = models.DecimalField(decimal_places=2,max_digits=50, blank=False)
	image = models.ImageField(default='default.png',upload_to='item_pics')
	description = models.TextField(blank=True)
	seller_name = models.CharField(max_length=100, blank=False)
	phone = models.DecimalField(max_digits=10,decimal_places=0)
	email = models.EmailField(max_length=100)
	date_posted = models.DateTimeField(default=timezone.now)
	user = models.ForeignKey(User,null=True,on_delete=models.CASCADE) 
