from django_filters import rest_framework as filters
from django_property_filter import PropertyFilterSet, PropertyRangeFilter
from rest_framework import viewsets
from django.contrib.gis.db import models
from django.contrib.gis.measure import Distance
from django.contrib.gis.geos import Point
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import Specimen
from .serializers import SpecimenSerializer


class SpecimenFilter(PropertyFilterSet):
    """
    標本情報のフィルタセット
    """
    date_identified = filters.DateTimeFromToRangeFilter()

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
                  'collection_name', 'institution_code', 'collection_code',
                  'identified_by', 'date_identified', 'collecter',
                  'year', 'month', 'day', 'sex', 'preparation_type',
                  'disposition', 'sampling_protocol', 'sampling_effort',
                  'lifestage', 'establishment_means', 'rights',
                  'note'
                  ]
        property_fields = [
            ('collect_point_info__longitude', PropertyRangeFilter, ['range']),
            ('collect_point_info__latitude', PropertyRangeFilter, ['range'])
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
                'filter_class': filters.DateTimeFromToRangeFilter,
            },
        }


class SpecimenViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有する標本情報取得ビュー
    """
    serializer_class = SpecimenSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = SpecimenFilter

    def get_queryset(self):
        user = self.request.user
        return Specimen.objects.filter(user=user)

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
