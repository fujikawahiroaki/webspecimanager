from drf_writable_nested import WritableNestedModelSerializer
from .models import SpecimenLabel
from specimens.serializers import SpecimenSerializer


class SpecimenLabelSerializer(WritableNestedModelSerializer):
    """標本ラベルモデル用シリアライザ"""
    label_specimens = SpecimenSerializer(many=True)

    class Meta:
        model = SpecimenLabel
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
