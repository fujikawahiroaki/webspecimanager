from django_filters import rest_framework as filters
from django_property_filter import (PropertyFilterSet,
                                    PropertyRangeFilter,
                                    PropertyCharFilter)
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.gis.db import models
from django.contrib.gis.measure import Distance
from django.contrib.gis.geos import Point
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import Specimen
from .serializers import SpecimenSerializer
from collection_settings.models import CollectionSetting


class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'page_size'


class SpecimenNameFilter(PropertyFilterSet):
    name = PropertyCharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Specimen
        fields = ['name']


class SpecimenFilter(PropertyFilterSet):
    """
    標本情報のフィルタセット
    """
    date_identified = filters.DateFromToRangeFilter()
    date_last_modified = filters.DateFromToRangeFilter()
    kingdom = PropertyCharFilter(field_name='kingdom', lookup_expr='icontains')
    phylum = PropertyCharFilter(field_name='phylum', lookup_expr='icontains')
    class_name = PropertyCharFilter(field_name='class_name',
                                    lookup_expr='icontains')
    order = PropertyCharFilter(field_name='order', lookup_expr='icontains')
    suborder = PropertyCharFilter(field_name='suborder',
                                  lookup_expr='icontains')
    family = PropertyCharFilter(field_name='family', lookup_expr='icontains')
    subfamily = PropertyCharFilter(field_name='subfamily',
                                   lookup_expr='icontains')
    tribe = PropertyCharFilter(field_name='tribe', lookup_expr='icontains')
    subtribe = PropertyCharFilter(field_name='subtribe',
                                  lookup_expr='icontains')
    genus = PropertyCharFilter(field_name='genus', lookup_expr='icontains')
    subgenus = PropertyCharFilter(field_name='subgenus',
                                  lookup_expr='icontains')
    species = PropertyCharFilter(field_name='species', lookup_expr='icontains')
    subspecies = PropertyCharFilter(field_name='subspecies',
                                    lookup_expr='icontains')
    scientific_name_author = PropertyCharFilter(field_name='scientific_name_author',
                                                lookup_expr='icontains')
    name_publishedin_year = PropertyRangeFilter(field_name='name_publishedin_year',
                                                lookup_expr='range')
    japanese_name = PropertyCharFilter(field_name='japanese_name',
                                       lookup_expr='icontains')

    class Meta:
        model = Specimen
        fields = ['default_taxon_info__kingdom', 'default_taxon_info__phylum',
                  'default_taxon_info__class_name',
                  'default_taxon_info__order', 'default_taxon_info__suborder',
                  'default_taxon_info__family',
                  'default_taxon_info__subfamily',
                  'default_taxon_info__tribe', 'default_taxon_info__subtribe',
                  'default_taxon_info__genus', 'default_taxon_info__subgenus',
                  'default_taxon_info__species',
                  'default_taxon_info__subspecies',
                  'default_taxon_info__scientific_name_author',
                  'default_taxon_info__name_publishedin_year',
                  'default_taxon_info__japanese_name',
                  'default_taxon_info__distribution',
                  'default_taxon_info__note',
                  'custom_taxon_info__kingdom', 'custom_taxon_info__phylum',
                  'custom_taxon_info__class_name',
                  'custom_taxon_info__order', 'custom_taxon_info__suborder',
                  'custom_taxon_info__family', 'custom_taxon_info__subfamily',
                  'custom_taxon_info__tribe', 'custom_taxon_info__subtribe',
                  'custom_taxon_info__genus', 'custom_taxon_info__subgenus',
                  'custom_taxon_info__species',
                  'custom_taxon_info__subspecies',
                  'custom_taxon_info__scientific_name_author',
                  'custom_taxon_info__name_publishedin_year',
                  'custom_taxon_info__japanese_name',
                  'custom_taxon_info__distribution',
                  'custom_taxon_info__note',
                  'collect_point_info__contient',
                  'collect_point_info__island_group',
                  'collect_point_info__island',
                  'collect_point_info__country',
                  'collect_point_info__state_provice',
                  'collect_point_info__county',
                  'collect_point_info__municipality',
                  'collect_point_info__verbatim_locality',
                  'collect_point_info__japanese_place_name',
                  'collect_point_info__japanese_place_name_detail',
                  'collect_point_info__coordinate_precision',
                  'collect_point_info__minimum_elevation',
                  'collect_point_info__maximum_elevation',
                  'collect_point_info__minimum_depth',
                  'collect_point_info__maximum_depth',
                  'collect_point_info__note',
                  'tour__title',
                  'collection_settings_info__collection_name',
                  'collection_settings_info__institution_code',
                  'collection_code', 'identified_by', 'date_identified',
                  'collecter', 'year', 'month', 'day', 'sex',
                  'preparation_type', 'disposition', 'sampling_protocol',
                  'sampling_effort', 'lifestage', 'establishment_means',
                  'rights', 'note', 'kingdom', 'phylum', 'class_name',
                  'order', 'suborder', 'family', 'subfamily', 'tribe',
                  'subtribe', 'genus', 'subgenus', 'species', 'subspecies',
                  'scientific_name_author', 'name_publishedin_year',
                  'japanese_name', 'date_last_modified'
                  ]
        property_fields = [
            ('collect_point_info__longitude', PropertyRangeFilter, ['range']),
            ('collect_point_info__latitude', PropertyRangeFilter, ['range']),
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
            models.IntegerField: {
                'filter_class': filters.RangeFilter,
            },
            models.FloatField: {
                'filter_class': filters.RangeFilter,
            },
            models.DateField: {
                'filter_class': filters.DateFromToRangeFilter,
            },
            models.DateTimeField: {
                'filter_class': filters.DateFromToRangeFilter,
            },
        }


class SpecimenViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有する標本情報取得ビュー
    """
    serializer_class = SpecimenSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend, OrderingFilter]
    filterset_class = SpecimenFilter
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
            specimen_within_radius = Specimen.objects.filter(
                collect_point_info__location__distance_lt=(
                    Point(lon, lat),
                    Distance(m=rad)
                )
            )
            return specimen_within_radius.filter(user=user)
        return Specimen.objects.filter(user=user)

    @action(methods=['get'], detail=False)
    def counter(self, request):
        target_taxon = self.request.query_params.get('target_taxon')
        specimen_list = []
        for i in self.get_queryset():
            specimen_list.append(self.get_serializer(i).instance)
        if target_taxon == 'species':
            sp_queryset = self.get_queryset().order_by('default_taxon_info').distinct(
            ).values_list('default_taxon_info', 'custom_taxon_info')
            num_sp = len(self.get_queryset().order_by('default_taxon_info__species').distinct(
            ).values_list('default_taxon_info__species', 'custom_taxon_info__species'))
            print("亜種なし")
            print(num_sp)
            return Response({'data': num_sp})
        elif target_taxon == 'subspecies':
            num_ssp = len(self.get_queryset().order_by('default_taxon_info__species').distinct().values_list(
                'default_taxon_info__species', 'custom_taxon_info__species', 'default_taxon_info__subspecies', 'custom_taxon_info__subspecies'))
            print("亜種あり")
            print(num_ssp)
            return Response({'data': num_ssp})

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SpecimenWithGeoInfoViewSet(SpecimenViewSet):
    """
    認証されたユーザーが所有する標本情報取得ビュー
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
            specimen_within_radius = Specimen.objects.filter(
                collect_point_info__location__distance_lt=(
                    Point(lon, lat),
                    Distance(m=rad)
                )
            )
            return specimen_within_radius.filter(user=user)
        return Specimen.objects.filter(user=user)
