from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers
from .models import SpecimenLabel
from specimens.serializers import SpecimenForLabelSerializer


class SpecimenLabelSerializer(serializers.ModelSerializer):
    """標本ラベルモデル用シリアライザ"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = SpecimenLabel
        fields = ['id', 'created_at', 'name',
                  'user', 'label_specimens',
                  'data_label_flag', 'coll_label_flag',
                  'det_label_flag', 'note_label_flag',
                  'pdf_filename']
        read_only_fields = ('created_at', 'id', 'pdf_filename', 'user')
