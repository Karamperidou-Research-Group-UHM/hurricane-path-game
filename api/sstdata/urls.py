from django.urls import path
from .views import SSTView

urlpatterns = [
    path('<str:season>', SSTView.as_view()),
]