from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('own-collect-points', views.CollectPointViewSet,
                basename='CollectPoint')


app_name = 'collect_points'


urlpatterns = [
    path('', include(router.urls)),
]
