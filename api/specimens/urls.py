from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('own-specimens', views.SpecimenViewSet,
                basename='Specimen')
router.register('own-specimens-with-geoinfo', views.SpecimenWithGeoInfoViewSet,
                basename='SpecimenWithGeoInfo')


app_name = 'specimens'


urlpatterns = [
    path('', include(router.urls)),
]
