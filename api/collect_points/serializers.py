from rest_framework import serializers
from collect_points.models import CollectPoint


class CollectPointSerializer(serializers.ModelSerializer):
    """採集地点モデル用シリアライザ"""
    class Meta:
        model = CollectPoint
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
