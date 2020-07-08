from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
	class Meta:
		model = Product
		fields = [
			'item',
			'price',
			'image',
			'description',
			'seller_name',
			'phone',
			'email'
		]