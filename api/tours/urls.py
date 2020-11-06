from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('own-tours', views.TourViewSet,
                basename='Tour')


app_name = 'tours'


urlpatterns = [
    path('', include(router.urls)),
]
