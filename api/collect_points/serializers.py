from rest_framework import serializers
from django.core.validators import RegexValidator
from django_countries.serializer_fields import CountryField
from django_countries.serializers import CountryFieldMixin
from drf_extra_fields.geo_fields import PointField
from drf_extra_fields.fields import Base64ImageField
from django.contrib.gis.geos import Point
# from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import CollectPoint


class CollectPointSerializer(CountryFieldMixin, serializers.ModelSerializer):
    """採集地点モデル用シリアライザ"""

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    country = CountryField(required=False)
    location = PointField(default=Point(0.0, 0.0, srid=4326))
    longitude = serializers.DecimalField(required=False,
                                         max_digits=9,
                                         decimal_places=6,
                                         read_only=True)
    latitude = serializers.DecimalField(required=False,
                                        max_digits=9,
                                        decimal_places=6,
                                        read_only=True)
    coordinate_precision = serializers.FloatField(required=False)
    minimum_elevation = serializers.FloatField(required=False)
    maximum_elevation = serializers.FloatField(required=False)
    minimum_depth = serializers.FloatField(required=False)
    maximum_depth = serializers.FloatField(required=False)
    image1 = Base64ImageField(required=False)
    image2 = Base64ImageField(required=False)
    image3 = Base64ImageField(required=False)
    image4 = Base64ImageField(required=False)
    image5 = Base64ImageField(required=False)

    class Meta:
        model = CollectPoint
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
        extra_kwargs = {
            'contient': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'island_group': {
                'validators': [RegexValidator(r'^[!-~ À-ÖØ-öø-ÿ]+$',
                                              message='半角英数記号およびアクセント記号付き文字のみ使用可')]
            },
            'island': {
                'validators': [RegexValidator(r'^[!-~ À-ÖØ-öø-ÿ]+$',
                                              message='半角英数記号およびアクセント記号付き文字のみ使用可')]
            },
            'state_provice': {
                'validators': [RegexValidator(r'^[!-~ À-ÖØ-öø-ÿ]+$',
                                              message='半角英数記号およびアクセント記号付き文字のみ使用可')]
            },
            'county': {
                'validators': [RegexValidator(r'^[!-~ À-ÖØ-öø-ÿ]+$',
                                              message='半角英数記号およびアクセント記号付き文字のみ使用可')]
            },
            'municipality': {
                'validators': [RegexValidator(r'^[!-~ À-ÖØ-öø-ÿ]+$',
                                              message='半角英数記号およびアクセント記号付き文字のみ使用可')]
            },
        }
