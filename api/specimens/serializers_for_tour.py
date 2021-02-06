from rest_framework import serializers
from .models import Specimen


class SpecimenForTourSerializer(serializers.ModelSerializer):
    """採集行シリアライザから呼び出すための標本情報シリアライザ"""

    class Meta:
        model = Specimen
        fields = ['id']
        read_only_fields = ('date_last_modified', 'id')
