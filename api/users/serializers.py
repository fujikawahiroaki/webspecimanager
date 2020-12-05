from rest_framework import serializers
from .models import UesrProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """ユーザープロファイルモデル用シリアライザ"""
    class Meta:
        model = UesrProfile
        fields = '__all__'
        read_only_fields = ('created_at', 'id', 'user')
