from drf_writable_nested import WritableNestedModelSerializer
from .models import SpecimenLabel
from specimens.serializers import SpecimenForLabelSerializer


class SpecimenLabelSerializer(WritableNestedModelSerializer):
    """標本ラベルモデル用シリアライザ"""
    label_specimens = SpecimenForLabelSerializer(many=True)

    class Meta:
        model = SpecimenLabel
        fields = ['id', 'created_at', 'name',
                  'user', 'label_specimens',
                  'data_label_flag', 'coll_label_flag',
                  'det_label_flag', 'note_label_flag',
                  'pdf_filename']
        read_only_fields = ('created_at', 'id')
