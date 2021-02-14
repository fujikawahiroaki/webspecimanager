from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('own-taxa', views.CustomTaxonViewSet,
                basename='CuntomTaxon')
router.register('shared-taxa', views.ReadOnlyDefaultTaxonViewset,
                basename='DefaultTaxon')
router.register('shared-taxa-writable', views.WritableDefaultTaxonViewSet,
                basename='DefaultTaxon')

app_name = 'taxa'


urlpatterns = [
    path('', include(router.urls)),
]
