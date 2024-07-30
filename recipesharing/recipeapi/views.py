from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Recipe, Comment, Rating, Category, Ingredient
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required




