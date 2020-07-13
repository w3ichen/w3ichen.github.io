from django.shortcuts import render, get_object_or_404, redirect, reverse
from django.views.generic import ListView, UpdateView
from django.views.generic.edit import FormMixin
from django.contrib.auth.models import User
from .models import Post, Comment
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.decorators import login_required
from .forms import NewPostForm, NewCommentForm
from django.contrib import messages
import datetime
from django.http import HttpResponse
from users import forms as user_forms
from users.models import Profile

@login_required(login_url='register')
def home(request):
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

@login_required(login_url='register')
def newPost(request):
	if request.method == 'POST':
		# new post
		form = NewPostForm(request.POST)
		form.instance.user = request.user
		if form.is_valid():
			form.save()
			messages.success(request, f'Posted')
	return redirect('blog-home')

# User's posts
class UserPostListView(LoginRequiredMixin,ListView,FormMixin):
	model = Post
	template_name = 'blog/user_posts.html' # <app>/<model>_<viewtype>.html
	context_object_name = 'posts'
	ordering = ['-date_posted']

	def get_queryset(self):
		# get user if it exists, if not return 404
		user = get_object_or_404(User, username=self.kwargs.get('username'))
		return Post.objects.filter(user=user).order_by('-date_posted')

	# change profile image form:
	form_class = user_forms.ProfileUpdateForm

	def post(self, request, *args, **kwargs):
		if request.method == "POST":
			form = self.get_form()
			if form.is_valid():
				user = get_object_or_404(User, username=self.kwargs.get('username'))
				profile = Profile.objects.filter(user=user).first()
				profile.image = form.cleaned_data['image']
				profile.save()
				return redirect("user-posts",user)

	def get_context_data(self, **kwargs):
		# Call the base implementation first to get a context
		context = super().get_context_data(**kwargs)
		user = get_object_or_404(User, username=self.kwargs.get('username'))
		total_likes = 0
		total_comments = 0
		total_posts = 0
		for post in Post.objects.all():
			if post.user == user: # if post is made by user
				total_likes += post.likes_count
				total_posts += 1
			for comment in post.comments.all():
				if comment.user == user: # is user's comments
					total_comments += 1
		context['name'] = user.username
		context['total_likes'] = total_likes
		context['total_comments'] = total_comments
		context['total_posts'] = total_posts
		context['profile_url'] = user.profile.image.url
		return context

# UserPassesTestMixin makes only author can edit post
class PostUpdateView(LoginRequiredMixin,UserPassesTestMixin,UpdateView):
	model = Post
	fields = ['content']

	def form_valid(self, form):
		form.instance.user = self.request.user
		return super().form_valid(form)

	def test_func(self):
		post = self.get_object()
		if self.request.user == post.user:
			# if the user is the author, then allow access
			return True
		return False

	def get_success_url(self):
		return reverse("blog-home")

# user clicks like button
@login_required(login_url='register')
def like(request):
	if request.method == "GET":
		post_id = request.GET['post_id']
		liked_post = get_object_or_404(Post, id=post_id)
		if liked_post.likes.filter(username=request.user.username).count() == 1:
			# user has already liked the post
			liked_post.likes.remove(request.user)
			liked_post.likes_count = liked_post.likes.count()
			liked_post.save()
			return HttpResponse('-1')
		else:
			liked_post.likes.add(request.user)
			liked_post.likes_count = liked_post.likes.count()
			liked_post.save()
			return HttpResponse('1')

	return redirect('blog-home')

# user clicks comment
@login_required(login_url='register')
def comment(request):
	if request.method == "GET":
		newComment = Comment.objects.create(
			user = request.user,
			text = request.GET.get('text')
		)

		commented_post = get_object_or_404(Post, id=request.GET.get('post_id'))

		commented_post.comments.add(newComment)
		commented_post.comments_count = commented_post.comments.count()
		commented_post.save()
		messages.success(request, f'Comment Added')
	return HttpResponse('Comment Added')

@login_required(login_url='register')
def deleteComment(request, postId, commentId):
	post = Post.objects.get(id=postId)
	comment = post.comments.get(id=commentId).delete()
	post.comments_count = post.comments.count()
	post.save()
	return redirect("blog-home")

@login_required(login_url='register')
def deletePost(register, id):
	Post.objects.get(id=id).delete()
	return redirect("blog-home")
