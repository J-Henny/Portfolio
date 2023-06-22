from django.urls import path
from . import views

urlpatterns = [
    path('send-email/', views.sendEmail),
]
