from django_filters import rest_framework as filters
from django_property_filter import PropertyFilterSet, PropertyRangeFilter
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from django.contrib.gis.db import models
from django.contrib.gis.measure import Distance
from django.contrib.gis.geos import Point
from .models import CollectPoint
from .serializers import CollectPointSerializer


class CollectPointFilter(PropertyFilterSet):
    """
    採集地点のフィルタセット
    """
    minimum_elevation = filters.RangeFilter()
    maximum_elevation = filters.RangeFilter()
    minimum_depth = filters.RangeFilter()
    maximum_depth = filters.RangeFilter()

    class Meta:
        model = CollectPoint
        fields = ['contient', 'island_group', 'island',
                  'country', 'state_provice', 'county',
                  'municipality', 'verbatim_locality',
                  'japanese_place_name', 'japanese_place_name_detail',
                  'minimum_elevation', 'maximum_elevation',
                  'minimum_depth', 'maximum_depth', 'note']
        property_fields = [
            ('longitude', PropertyRangeFilter, ['range']),
            ('latitude', PropertyRangeFilter, ['range'])
        ]
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
        }


class CollectPointViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有する採集ポイント情報取得ビュー
    """
    serializer_class = CollectPointSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = CollectPointFilter

    def get_queryset(self):
        user = self.request.user
        return CollectPoint.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
