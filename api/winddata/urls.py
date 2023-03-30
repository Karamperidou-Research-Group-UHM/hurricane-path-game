from django.urls import path
from .views import WindDataView

urlpatterns = [
    path('<str:season>', WindDataView.as_view()),
]