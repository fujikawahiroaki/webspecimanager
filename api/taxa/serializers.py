from rest_framework import serializers
from .models import CustomTaxon, DefaultTaxon


class DefaultTaxonSerializer(serializers.ModelSerializer):
    """デフォルト分類モデル用シリアライザ"""
    name_publishedin_year = serializers.IntegerField(required=False)

    class Meta:
        model = DefaultTaxon
        fields = '__all__'
        read_only_fields = ('created_at', 'id')


class CustomTaxonSerializer(serializers.ModelSerializer):
    """カスタム分類モデル用シリアライザ"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    name_publishedin_year = serializers.IntegerField(required=False)

    class Meta:
        model = CustomTaxon
        fields = '__all__'
        read_only_fields = ('created_at', 'id', 'user')
