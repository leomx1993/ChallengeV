from django.urls import path
from . import views

urlpatterns = [
    path('node', views.vom_node_data),
    path('response', views.vom_execution_engine),
]