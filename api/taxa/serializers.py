from rest_framework import serializers
from taxa.models import Taxon


class TaxonSerializer(serializers.ModelSerializer):
    """分類モデル用シリアライザ"""
    class Meta:
        model = Taxon
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
