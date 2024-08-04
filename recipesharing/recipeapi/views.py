

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Recipe, Rating, Comment, ShoppingList
from .serializers import UserSerializer, MyTokenPairSerializer, RegisterSerializer, RecipeSerializer, RatingSerializer, CommentSerializer, ShoppingListSerializer
from rest_framework import status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework import generics
from rest_framework import viewsets

from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()  # Corrected typo in queryset definition
    permission_classes = (AllowAny,)  # Corrected tuple syntax for permission_classes
    serializer_class = RegisterSerializer


@api_view(['GET'])
def ListUser(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


    
@api_view(['PATCH'])
def editUser(request, pk):
    data = User.objects.get(pk=pk)
    serializer = UserSerializer(instance=data, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)
    
@api_view(['DELETE'])
def deleteUser(request, pk):
    user = get_object_or_404(User, pk=pk)
    user.delete()
    return Response({"message": "user deleted"}, status=status.HTTP_202_ACCEPTED)
    
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]  # Optional: Requires authentication to access these views

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Automatically associate the profile with the current user
        

@api_view(['GET'])
def listRecipes(request):
    data = Recipe.objects.all()
    serializer = RecipeSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def listRatings(request):
    data = Rating.objects.all()
    serializer = RatingSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def postRatings(request):
    serializer = RatingSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


        
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class CommentListView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class ShoppingListViewSet(viewsets.ModelViewSet):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)