
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
 
# importing views from views..py
router = DefaultRouter()
router.register('profiles',views.ProfileViewSet, basename='profile')
router.register('comments', views.CommentViewSet, basename='comment')
router.register('categories', views.CategoryViewSet, basename='category')
router.register(r'recipes', views.RecipeViewSet, basename='recipe')


urlpatterns = [
    path('users/', views.ListUser, name = 'UserList'),
    path('users/update/<int:pk>', views.editUser, name = 'editUser'),
    path('users/delete/<int:pk>', views.deleteUser, name = 'deleteUser'),
    
    
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='register'),
    
    path('recipe/', views.listRecipes, name = 'listRecipes'),
    
    
    
    path('comments/get/', views.CommentListView.as_view(), name='comment-list'),

    
    path('ratings/', views.listRatings, name = 'listRatings'),
    path('ratings/post/', views.postRatings, name = 'postRatings'),
    
    
    path('', include(router.urls)),
]