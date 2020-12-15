from django_filters import rest_framework as filters
from django.contrib.gis.db import models
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import UserProfile
from .serializers import UserProfileSerializer


class UserProfileFilter(filters.FilterSet):
    """
    ユーザープロファイル情報のフィルタセット
    """

    class Meta:
        model = UserProfile
        fields = ['contient', 'island_group', 'island', 'country',
                  'state_provice', 'identified_by', 'collecter',
                  'preparation_type', 'disposition', 'lifestage',
                  'establishment_means', 'rights', 'kingdom',
                  'phylum', 'class_name', 'order']
        filter_overrides = {
            models.CharField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {
                    'lookup_expr': 'icontains',
                },
            },
        }


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有するユーザープロファイル情報取得ビュー
    """
    serializer_class = UserProfileSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = UserProfileFilter

    def get_queryset(self):
        user = self.request.user
        return UserProfile.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
