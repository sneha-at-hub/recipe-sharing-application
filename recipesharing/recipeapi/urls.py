
from django.urls import path
from . import views
 
# importing views from views..py

urlpatterns = [
    path('users/', views.ListUser, name = 'UserList'),
    path('users/create', views.createUser, name = 'createUser'),
]