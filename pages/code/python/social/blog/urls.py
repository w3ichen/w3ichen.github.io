from django.urls import path
from . import views
from .views import UserPostListView, PostUpdateView

urlpatterns = [
	path('',views.home , name='blog-home'),
	path('user/<str:username>',UserPostListView.as_view() , name='user-posts'),

	path('like/', views.like, name="like"),
	path('comment/', views.comment, name="comment"),
	path('comment/<int:postId>/<int:commentId>/delete', views.deleteComment, name="comment-delete"),
	path('post/<int:id>/delete', views.deletePost, name="post-delete"),
	path('post/<int:pk>/edit',PostUpdateView.as_view() , name='post-edit'),
	path('post/new', views.newPost, name='post-new')
]
