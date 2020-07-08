from django.shortcuts import render, redirect, get_object_or_404
from .forms import ProductForm
from .models import Product
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def home(request):
	context = {
	   'products':Product.objects.all().order_by('-date_posted')
	}
	return render(request, 'sell/home.html',context)

@login_required(login_url='login')
def sell(request):
	form = ProductForm()
	if request.method == "POST":
		form = ProductForm(request.POST, request.FILES)
		if form.is_valid():
			# saving request.user as user
			form.instance.user = request.user
			form.save() # save to database
			return redirect('home')
		else:
			print(form.errors)
	return render(request, 'sell/sell_item.html', {'form':form})

def item_detail(request,id):
	context = {
		'product':Product.objects.get(id=id)
	}
	return render(request, 'sell/item_detail.html', context)

@login_required(login_url='login')
def item_delete(request, id):
	if request.user == Product.objects.get(id=id).user:
		Product.objects.get(id=id).delete()
		messages.success(request, f'Successfully deleted item')
	else:
		messages.error(request, f'Failed to Delete. You do not have access')
		return redirect('home')
	return redirect('user_products', request.user)

@login_required(login_url='login')
def item_edit(request, id):
	if request.user == Product.objects.get(id=id).user:
		instance = get_object_or_404(Product, id=id)
		form = ProductForm(request.POST or None, request.FILES or None, instance=instance)
		if form.is_valid():
			form.save()
			messages.success(request, f'Successfully updated item')
			return redirect('user_products', request.user)
	else:
		messages.error(request, f'Failed to Update. You do not have access')
		return redirect('home')
	return render(request, 'sell/item_edit.html', {'form':form})

@login_required(login_url='login')
def user_products(request, username):
	context = {
		'user_products':Product.objects.filter(user=request.user).order_by('-date_posted')
	}
	return render(request, 'sell/user_products.html', context)