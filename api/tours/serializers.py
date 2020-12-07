from rest_framework import serializers
from .models import Tour


class TourSerializer(serializers.ModelSerializer):
    """採集行モデル用シリアライザ"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    start_date = serializers.DateField(required=False)
    end_date = serializers.DateField(required=False)

    class Meta:
        model = Tour
        fields = '__all__'
        read_only_fields = ('created_at', 'id', 'user')
