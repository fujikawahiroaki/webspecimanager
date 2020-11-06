from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('own-taxa', views.TaxonViewSet,
                basename='Taxon')


app_name = 'taxa'


urlpatterns = [
    path('', include(router.urls)),
]
