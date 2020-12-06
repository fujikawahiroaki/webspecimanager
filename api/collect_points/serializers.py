from rest_framework import serializers
from .models import CollectPoint


class CollectPointSerializer(serializers.ModelSerializer):
    """採集地点モデル用シリアライザ"""

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    longitude = serializers.DecimalField(required=False,
                                         max_digits=9,
                                         decimal_places=6)
    latitude = serializers.DecimalField(required=False,
                                        max_digits=9,
                                        decimal_places=6)
    coordinate_precision = serializers.FloatField(required=False)
    minimum_elevation = serializers.FloatField(required=False)
    maximum_elevation = serializers.FloatField(required=False)
    minimum_depth = serializers.FloatField(required=False)
    maximum_depth = serializers.FloatField(required=False)

    class Meta:
        model = CollectPoint
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
