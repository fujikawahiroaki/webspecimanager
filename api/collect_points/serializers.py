from rest_framework import serializers
from django_countries.serializer_fields import CountryField
from drf_extra_fields.geo_fields import PointField
from django.contrib.gis.geos import Point
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import CollectPoint


class CollectPointSerializer(serializers.ModelSerializer):
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

    class Meta:
        model = CollectPoint
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
