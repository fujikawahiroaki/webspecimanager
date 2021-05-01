from django_filters import rest_framework as filters
from django.contrib.gis.db import models
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import CollectionSetting
from .serializers import CollectionSettingSerializer


class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'page_size'


class CollectionSettingFilter(filters.FilterSet):
    """
    コレクション設定情報のフィルタセット
    """

    class Meta:
        model = CollectionSetting
        fields = ['collection_name', 'institution_code',
                  'latest_collection_code', 'note', 'created_at']
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
            models.IntegerField: {
                'filter_class': filters.RangeFilter,
            },
            models.DateTimeField: {
                'filter_class': filters.DateTimeFilter,
                'extra': lambda f: {
                    'lookup_expr': 'date',
                }
            },
        }


class CollectionSettingViewset(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有するコレクション設定情報取得ビュー
    """
    serializer_class = CollectionSettingSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend, OrderingFilter]
    filterset_class = CollectionSettingFilter
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        user = self.request.user
        return CollectionSetting.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
