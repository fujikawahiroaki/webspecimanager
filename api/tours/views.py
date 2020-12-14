from django_filters import rest_framework as filters
from django.contrib.gis.db import models
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import Tour
from .serializers import TourSerializer


class TourFilter(filters.FilterSet):
    """
    採集行情報のフィルタセット
    """

    class Meta:
        model = Tour
        fields = ['title', 'start_date', 'end_date', 'note']
        filter_overrides = {
            models.CharField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {
                    'lookup_expr': 'icontains',
                },
            },
            models.TextField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {
                    'lookup_expr': 'icontains',
                },
            },
            models.DateField: {
                'filter_class': filters.DateFromToRangeFilter,
            },
        }


class TourViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有する採集行情報取得ビュー
    """
    serializer_class = TourSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = TourFilter

    def get_queryset(self):
        user = self.request.user
        return Tour.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
