from rest_framework import serializers
from django.core.validators import RegexValidator
from .models import CollectionSetting
from specimens.models import Specimen
from specimens.serializers_for_collection_setting \
    import SpecimenForCollectionSettingSerializer


class CollectionSettingSerializer(serializers.ModelSerializer):
    """コレクション設定モデル用シリアライザ"""
    latest_collection_code = serializers.IntegerField(required=False)
    specimens = serializers.SerializerMethodField()
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def get_specimens(self, obj):
        specimens_data = SpecimenForCollectionSettingSerializer(
            Specimen.objects.all().filter(
                collection_settings_info=CollectionSetting.objects.get(id=obj.id)), many=True).data
        return specimens_data

    class Meta:
        model = CollectionSetting
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
        extra_kwargs = {
            'collection_name': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'institution_code': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
        }
