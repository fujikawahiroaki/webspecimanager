from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('own-labels', views.SpecimenLabelView,
                basename='SpecimenLabel')


app_name = 'label_maker'


urlpatterns = [
    path('', include(router.urls)),
]
