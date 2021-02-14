from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('own-user-profiles', views.UserProfileViewSet,
                basename='UserProfile')


app_name = 'users'


urlpatterns = [
    path('', include(router.urls)),
]
