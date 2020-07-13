from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, ProfileUpdateForm
from django.contrib import messages

def logoutUser(request):
	logout(request)
	messages.success(request, f'Successfully logged out')
	return redirect('login')

def register(request):
	if request.method == 'POST':
		form = UserRegisterForm(request.POST)
		if form.is_valid():
			form.save()
			username = form.cleaned_data.get('username')
			messages.success(request, f'Account created for {username}')
			return redirect('login')
	else:
		form = UserRegisterForm()
	return render(request, 'users/register.html',{'form':form})


@login_required(login_url='register')
def profile(request):
	if request.method == 'POST':
		form = ProfileUpdateForm(request.POST, 
								 request.FILES, 
								 instance=request.user.profile)
		if form.is_valid():
			form.save()
			messages.success(request, f'Successfully updated profile picture')
			return redirect('profile')

	else:
		form = ProfileUpdateForm(instance=request.user.profile)

	return render(request, 'blog/user_posts.html', {'pic_form':form})