from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, permissions, filters, generics, viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.views import APIView

from .models import User, Recipe, Rating, Comment, ShoppingList, Category, Profile
from .serializers import (
    UserSerializer,
    MyTokenPairSerializer,
    RegisterSerializer,
    RecipeSerializer,
    RatingSerializer,
    CommentSerializer,
    ShoppingListSerializer,
    CategorySerializer,
    ProfileSerializer
)

# JWT Token View
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenPairSerializer

class UserDetailFromTokenView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }
        return Response(user_data, status=status.HTTP_200_OK)

# User Registration View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# User List View
@api_view(['GET'])
def ListUser(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# User Edit View
@api_view(['PATCH'])
def editUser(request, pk):
    data = User.objects.get(pk=pk)
    serializer = UserSerializer(instance=data, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)

# User Delete View
@api_view(['DELETE'])
def deleteUser(request, pk):
    user = get_object_or_404(User, pk=pk)
    user.delete()
    return Response({"message": "user deleted"}, status=status.HTTP_202_ACCEPTED)

# Profile ViewSet
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Recipe List View
@api_view(['GET'])
def listRecipes(request):
    data = Recipe.objects.all()
    serializer = RecipeSerializer(data, many=True)
    return Response(serializer.data)

# Rating List View
@api_view(['GET'])
def listRatings(request):
    data = Rating.objects.all()
    serializer = RatingSerializer(data, many=True)
    return Response(serializer.data)

# Rating Post View
@api_view(['POST'])
def postRatings(request):
    serializer = RatingSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

# Category ViewSet
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Comment ViewSet
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Comment List View
class CommentListView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

# ShoppingList ViewSet
class ShoppingListViewSet(viewsets.ModelViewSet):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

# Recipe ViewSet
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'description', 'ingredient']
