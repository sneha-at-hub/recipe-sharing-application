# Generated by Django 5.0.7 on 2024-09-10 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipeapi', '0006_recipe_detailed_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroceryItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('completed', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
