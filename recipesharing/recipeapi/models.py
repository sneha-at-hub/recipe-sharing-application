from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models




# Authentication and Profile Models
class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.username

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=300)
    bio = models.CharField(max_length=300)
    image = models.ImageField(default="default.jpg", upload_to="user_images")
    verified = models.BooleanField(default=False)
    
    def __str__(self):
        return self.full_name
    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

# Recipe Models
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class Recipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField()
    ingredient = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    prep_time = models.CharField(max_length=50, null=True, blank=True)  # New field for preparation time
    additional_time = models.CharField(max_length=50, null=True, blank=True)  # New field for additional time
    total_time = models.CharField(max_length=50, null=True, blank=True)  # New field for total time
    servings = models.CharField(max_length=50, null=True, blank=True)  # New field for servings
    yield_amount = models.CharField(max_length=50, null=True, blank=True)  # New field for yield
    cooking_time = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='recipes/', null=True, blank=True)

    def average_rating(self):
        ratings = self.ratings.all()
        if ratings.exists():
            return sum(rating.rating for rating in ratings) / ratings.count()
        return 0

    def __str__(self):
        return self.title

    def __str__(self):
        return self.title
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.recipe.title}"

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])

    def __str__(self):
        return f"{self.rating} by {self.user.username} for {self.recipe.title}"

# Shopping List Model
class ShoppingList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    recipes = models.ManyToManyField(Recipe, related_name='shopping_lists')
    items = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"Shopping List: {self.name} by {self.user.username}"

    def generate_items(self):
        ingredients = {}
        for recipe in self.recipes.all():
            for line in recipe.ingredient.split('\n'):
                if ':' in line:
                    name, qty = line.split(':')
                    name = name.strip()
                    qty = int(qty.strip())
                    if name in ingredients:
                        ingredients[name] += qty
                    else:
                        ingredients[name] = qty
        self.items = ingredients
        self.save()

    def add_recipe(self, recipe):
        self.recipes.add(recipe)
        self.generate_items()

    def remove_recipe(self, recipe):
        self.recipes.remove(recipe)
        self.generate_items()
