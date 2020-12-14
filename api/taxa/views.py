from django_filters import rest_framework as filters
from django.contrib.gis.db import models
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import CustomTaxon, DefaultTaxon
from .serializers import CustomTaxonSerializer, DefaultTaxonSerializer


class DefaultTaxonFilter(filters.FilterSet):
    """
    デフォルト分類情報のフィルタセット
    """

    class Meta:
        model = DefaultTaxon
        fields = [
            'kingdom', 'phylum', 'class_name', 'order', 'suborder',
            'family', 'subfamily', 'tribe', 'subtribe', 'genus', 'subgenus',
            'species', 'subspecies', 'scientific_name_author',
            'name_publishedin_year', 'japanese_name', 'distribution', 'note',
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
        }


class CustomTaxonFilter(filters.FilterSet):
    """
    カスタム分類情報のフィルタセット
    """

    class Meta:
        model = CustomTaxon
        fields = [
            'kingdom', 'phylum', 'class_name', 'order', 'suborder',
            'family', 'subfamily', 'tribe', 'subtribe', 'genus', 'subgenus',
            'species', 'subspecies', 'scientific_name_author',
            'name_publishedin_year', 'japanese_name', 'distribution', 'note',
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
        }


class DefaultTaxonViewset(viewsets.ModelViewSet):
    """
    デフォルト分類情報モデル用ビュー(全ユーザー共有)
    """
    queryset = DefaultTaxon.objects.all()
    serializer_class = DefaultTaxonSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = DefaultTaxonFilter


class CustomTaxonViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有するカスタム分類情報取得ビュー
    """
    serializer_class = CustomTaxonSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = CustomTaxonFilter

    def get_queryset(self):
        user = self.request.user
        return CustomTaxon.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
