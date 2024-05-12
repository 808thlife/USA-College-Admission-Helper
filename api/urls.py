from django.urls import path

from . import views

urlpatterns = [
    path("", views.get_colleges, name = "get-college")
]
