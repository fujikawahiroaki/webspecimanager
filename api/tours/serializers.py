from rest_framework import serializers
from .models import Tour


class TourSerializer(serializers.ModelSerializer):
    """採集行モデル用シリアライザ"""
    class Meta:
        model = Tour
        fields = '__all__'
        read_only_fields = ('created_at', 'id', 'user')
