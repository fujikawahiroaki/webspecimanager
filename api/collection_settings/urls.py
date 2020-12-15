from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('own-collection-settings', views.CollectionSettingViewset,
                basename='CollectionSetting')


app_name = 'collection_settings'


urlpatterns = [
    path('', include(router.urls)),
]
