from rest_framework import serializers
from .models import CustomTaxon, DefaultTaxon


class DefaultTaxonSerializer(serializers.ModelSerializer):
    """デフォルト分類モデル用シリアライザ"""
    class Meta:
        model = DefaultTaxon
        fields = '__all__'
        read_only_fields = ('created_at', 'id')


class CustomTaxonSerializer(serializers.ModelSerializer):
    """カスタム分類モデル用シリアライザ"""
    class Meta:
        model = CustomTaxon
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
