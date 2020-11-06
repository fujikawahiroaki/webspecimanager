from rest_framework import serializers
from specimens.models import Specimen


class SpecimenSerializer(serializers.ModelSerializer):
    """標本情報モデル用シリアライザ"""
    class Meta:
        model = Specimen
        fields = '__all__'
        read_only_fields = ('date_last_modified', 'id')
