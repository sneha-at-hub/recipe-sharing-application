
from django.urls import path
from . import views
 
# importing views from views..py

urlpatterns = [
    path('', views.ListUser, name = 'UserList'),
    path('create/', views.createUser, name = 'createUser'),
]