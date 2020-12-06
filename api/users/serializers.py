from rest_framework import serializers
from .models import UesrProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """ユーザープロファイルモデル用シリアライザ"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UesrProfile
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
