from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import UserRegisterForm
from django.contrib.auth import logout

def register(request):
	if request.method == 'POST':
		form = UserRegisterForm(request.POST)
		if form.is_valid():
			form.save()
			username = form.cleaned_data.get('username')
			messages.success(request, f'Account created for {username}!')
			return redirect('login')
	else:
		form = UserRegisterForm()
	return render(request, 'user/register.html',{'form':form})

@login_required(login_url='home')
def logoutUser(request):
	logout(request)
	messages.success(request, f'Logged out')
	return redirect('home')
