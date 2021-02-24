from django_filters import rest_framework as filters
from django.contrib.gis.db import models
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import OrderingFilter
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import CustomTaxon, DefaultTaxon
from .serializers import CustomTaxonSerializer, DefaultTaxonSerializer
from my_utils.post_many import multi_create

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
            'created_at',
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
            models.DateTimeField: {
                'filter_class': filters.DateTimeFilter,
                'extra': lambda f: {
                    'lookup_expr': 'date',
                }
            }
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
            'created_at',
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
            models.DateTimeField: {
                'filter_class': filters.DateTimeFilter,
                'extra': lambda f: {
                    'lookup_expr': 'date',
                }
            }
        }


class WritableDefaultTaxonViewSet(viewsets.ModelViewSet):
    """
    デフォルト分類情報モデル書き込み可能ビュー(管理者のみ)
    """
    queryset = DefaultTaxon.objects.all()
    serializer_class = DefaultTaxonSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = DefaultTaxonFilter

    def get_queryset(self):
        return DefaultTaxon.objects.all()

    def perform_create(self, serializer):
        serializer.save()

    @multi_create(serializer_class=DefaultTaxonSerializer)
    def create(self, request):
        pass


class ReadOnlyDefaultTaxonViewset(viewsets.ReadOnlyModelViewSet):
    """
    デフォルト分類情報モデル読み込み専用ビュー(全ユーザー共有)
    """
    queryset = DefaultTaxon.objects.all()
    serializer_class = DefaultTaxonSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend, OrderingFilter]
    filterset_class = DefaultTaxonFilter
    ordering_fields = [
            'kingdom', 'phylum', 'class_name', 'order', 'suborder',
            'family', 'subfamily', 'tribe', 'subtribe', 'genus', 'subgenus',
            'species', 'subspecies', 'scientific_name_author',
            'name_publishedin_year', 'japanese_name', 'distribution', 'note',
            'created_at'
        ]

    def get_queryset(self):
        return DefaultTaxon.objects.all()


class CustomTaxonViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有するカスタム分類情報取得ビュー
    """
    serializer_class = CustomTaxonSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend, OrderingFilter]
    filterset_class = CustomTaxonFilter
    ordering_fields = [
            'kingdom', 'phylum', 'class_name', 'order', 'suborder',
            'family', 'subfamily', 'tribe', 'subtribe', 'genus', 'subgenus',
            'species', 'subspecies', 'scientific_name_author',
            'name_publishedin_year', 'japanese_name', 'distribution', 'note',
            'created_at'
        ]

    def get_queryset(self):
        user = self.request.user
        return CustomTaxon.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
