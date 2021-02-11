import os
import base64

from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import OrderingFilter

from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication

from django.conf import settings
from django.db import transaction
from django.utils.decorators import method_decorator

from .models import SpecimenLabel
from .serializers import SpecimenLabelSerializer
from .utils import LabelCanvas
from specimens.serializers import SpecimenForLabelSerializer


class SpecimenLabelFilter(filters.FilterSet):
    """
    標本ラベルのフィルタセット
    """
    name = filters.CharFilter(lookup_expr='icontains')
    created_at = filters.DateTimeFilter(lookup_expr='date')

    class Meta:
        model = SpecimenLabel
        fields = ['name', 'created_at']


@method_decorator(transaction.atomic, name='create')
class SpecimenLabelView(viewsets.ModelViewSet):
    """標本ラベルビュー"""
    serializer_class = SpecimenLabelSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend, OrderingFilter]
    filterset_class = SpecimenLabelFilter

    def get_queryset(self):
        user = self.request.user
        return SpecimenLabel.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(methods=['get'], detail=True)
    def make_pdf(self, request, *args, **kwargs):
        """標本ラベルPDF生成のためのカスタムアクションメソッド"""
        splabel = self.get_object()
        splabel_serializer = self.get_serializer(splabel)
        pdf_filename = splabel_serializer.instance.pdf_filename
        splabel_queryset = splabel_serializer.instance.label_specimens.all()
        specimen_serializer = SpecimenForLabelSerializer(splabel_queryset,
                                                         many=True)
        splabel_dict_list = list(specimen_serializer.data)
        canvas = LabelCanvas(splabel_dict_list, pdf_filename)
        canvas.write_label(data=splabel_serializer.instance.data_label_flag,
                           coll=splabel_serializer.instance.coll_label_flag,
                           det=splabel_serializer.instance.det_label_flag,
                           note=splabel_serializer.instance.note_label_flag)
        filepath = os.path.join(settings.BASE_DIR,
                                f"label_maker/pdf/{pdf_filename}")
        return _pdf_download_response(pdf_filename, filepath)


def _pdf_download_response(filename, filepath):
    """
    pdfのダウンロードをおこなう
    Args:
        filepath: ファイルのパス
        filename: ファイル名
    Returns:
        HttpResponse: HttpResponse
    """
    with open(filepath, 'rb') as pdf:
        pdf_encoded = base64.b64encode(pdf.read())
    return Response({'detail': 'label pdf', 'pdf': pdf_encoded})
