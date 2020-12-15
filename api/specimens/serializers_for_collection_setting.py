from rest_framework import serializers
from .models import Specimen


class SpecimenForCollectionSettingSerializer(serializers.ModelSerializer):
    """コレクション設定シリアライザから呼び出すための標本情報シリアライザ"""

    class Meta:
        model = Specimen
        fields = ['id']
        read_only_fields = ('date_last_modified', 'id')
