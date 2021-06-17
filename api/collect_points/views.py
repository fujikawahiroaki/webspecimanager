import requests
import json
from django_filters import rest_framework as filters
from django_property_filter import PropertyFilterSet, PropertyRangeFilter
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.gis.db import models
from django.contrib.gis.measure import Distance
from django.contrib.gis.geos import Point
from django.conf import settings
from .models import CollectPoint
from .serializers import CollectPointSerializer

class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'page_size'


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
                  'minimum_depth', 'maximum_depth', 'note', 'created_at']
        property_fields = [
            ('longitude', PropertyRangeFilter, ['range']),
            ('latitude', PropertyRangeFilter, ['range'])
        ]
        minimum_elevation = filters.RangeFilter(field_name='minimum_elevation')
        maximum_elevation = filters.RangeFilter(field_name='maximum_elevation')
        minimum_depth = filters.RangeFilter(field_name='minimum_depth')
        maximum_depth = filters.RangeFilter(field_name='maximum_depth')
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
            models.DateTimeField: {
                'filter_class': filters.DateTimeFilter,
                'extra': lambda f: {
                    'lookup_expr': 'date',
                }
            },
        }


class CollectPointViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有する採集ポイント情報取得ビュー
    """
    serializer_class = CollectPointSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend, OrderingFilter]
    filterset_class = CollectPointFilter
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        user = self.request.user
        lon = self.request.query_params.get('longitude')
        if lon is not None:
            lon = float(lon)
        lat = self.request.query_params.get('latitude')
        if lat is not None:
            lat = float(lat)
        rad = self.request.query_params.get('radius')
        if rad is not None:
            rad = float(rad)
        if lon is not None and lat is not None and rad is not None:
            collect_point_within_radius = CollectPoint.objects.filter(
                location__distance_lt=(
                    Point(lon, lat),
                    Distance(m=rad)
                )
            )
            return collect_point_within_radius.filter(user=user)
        return CollectPoint.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(methods=['get'], detail=False)
    def reverce_zipcode(self, request):
        search_place = self.request.query_params.get('for_reverce_zipcode')
        zip_request = requests.get(f"https://zipcode.milkyfieldcompany.com/api/v1/findzipcode?apikey={settings.ZIPCODE_REVERCE_API_KEY}&address={search_place}")
        try:
            response = zip_request.json()
            return Response({'data': response})
        except:
            print(zip_request)
            return Response({'data': "エラー"})
    

class CollectPointWithGeoInfoViewSet(CollectPointViewSet):
    """
    認証されたユーザーが所有する採集ポイント情報取得ビュー
    クエリ文字列で緯度・経度・半径を指定し、その緯度・経度から
    半径内にある位置情報を所持する標本情報を返す
    """
    def get_queryset(self):
        user = self.request.user
        lon = self.request.query_params.get('longitude')
        if lon is not None:
            lon = float(lon)
        lat = self.request.query_params.get('latitude')
        if lat is not None:
            lat = float(lat)
        rad = self.request.query_params.get('radius')
        if rad is not None:
            rad = float(rad)
        if lon is not None and lat is not None and rad is not None:
            collect_point_within_radius = CollectPoint.objects.filter(
                location__distance_lt=(
                    Point(lon, lat),
                    Distance(m=rad)
                )
            )
            return collect_point_within_radius.filter(user=user)
        return CollectPoint.objects.filter(user=user)
