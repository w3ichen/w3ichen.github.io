from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView
from django.contrib.auth.models import User
from .models import Post
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.decorators import login_required
from .forms import NewPostForm, NewCommentForm
from django.contrib import messages
import datetime
from django.http import HttpResponse

@login_required(login_url='register')
def home(request):
	if request.method == 'POST':
		# new post
		form = NewPostForm(request.POST)
		form.instance.user = request.user
		if form.is_valid():
			form.save()
			messages.success(request, f'Posted')
	context = {
		'posts':Post.objects.all().order_by('-date_posted'),
		'post_form':NewPostForm(),
		'comment_form':NewCommentForm()
	}
	# greetings
	now = datetime.datetime.now()
	hour = now.hour;
	if (hour >= 5 and hour < 12):
		# 5AM - 11:59AM
		context['greetings'] = "Good Morning "+str(request.user)
	elif (hour >= 12 and hour < 17):
		# 12PM - 4:59PM
		context['greetings'] = "Good Afternoon "+str(request.user)
	else:
		# 5PM - 4:59AM
		context['greetings'] = "Good Evening "+str(request.user)
	return render(request, 'blog/home.html', context)


# User's posts
class UserPostListView(LoginRequiredMixin,ListView):
	model = Post
	template_name = 'blog/user_posts.html' # <app>/<model>_<viewtype>.html
	context_object_name = 'posts'
	ordering = ['-date_posted']
	paginate_by = 5 # number of posts per page

	def get_queryset(self):
		# get user if it exists, if not return 404
		user = get_object_or_404(User, username=self.kwargs.get('username'))
		return Post.objects.filter(user=user).order_by('-date_posted')

# user clicks like button
@login_required(login_url='register')
def like(request, id):
	liked_post = get_object_or_404(Post, id=id)
	if liked_post.likes.filter(username=request.user.username).count() == 1:
		# user has already liked the post
		liked_post.likes.remove(request.user)
	else:
		liked_post.likes.add(request.user)

	liked_post.likes_count = liked_post.likes.count()
	liked_post.save()

	return redirect('blog-home')

# user clicks comment
@login_required(login_url='register')
def comment(request, id):
	form = NewCommentForm(request.POST)
	form.instance.user = request.user

	if form.is_valid():
		commented_post = get_object_or_404(Post, id=id)
		newComment = form.save()
		commented_post.comments.add(newComment)
		commented_post.comments_count = commented_post.comments.count()
		commented_post.save()
		messages.success(request, f'Comment Added')
	return redirect('blog-home')