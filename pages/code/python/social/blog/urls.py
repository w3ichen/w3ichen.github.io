from django.urls import path
from . import views
from .views import UserPostListView
# , PostDetailView, PostCreateView, PostUpdateView, PostDeleteView

urlpatterns = [
	path('',views.home , name='blog-home'),
	path('user/<str:username>',UserPostListView.as_view() , name='user-posts'),

	path('like/', views.like, name="like"),
	path('comment/<int:id>', views.comment, name="comment")
]
