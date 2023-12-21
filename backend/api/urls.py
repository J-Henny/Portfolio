from django.urls import path
from . import views

app_name = 'frontend'

urlpatterns = [
    path('send-email/', views.sendMail),
    path('login/', views.login),
    path('redirect/', views.callback),
    path('reccomend/', views.reccomend),
]
