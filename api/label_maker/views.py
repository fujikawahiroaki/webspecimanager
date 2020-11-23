import os
from urllib.parse import quote

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication

from django.conf import settings
from django.http import HttpResponse
from django.db import transaction
from django.utils.decorators import method_decorator

from .models import SpecimenLabel
from .serializers import SpecimenLabelSerializer
from .utils import LabelCanvas


@method_decorator(transaction.atomic, name='create')
class SpecimenLabelView(viewsets.ModelViewSet):
    """標本ラベルビュー"""
    serializer_class = SpecimenLabelSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return SpecimenLabel.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(methods=['post'], detail=True)
    def make_pdf(self, request, *args, **kwargs):
        """標本ラベルPDF生成のためのカスタムアクションメソッド"""
        splabel = self.get_object()
        splabel_serializer = self.get_serializer(splabel)
        pdf_filename = splabel_serializer.instance.pdf_filename
        canvas = LabelCanvas(splabel_serializer.instance.label_specimens,
                             pdf_filename)
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
        response = HttpResponse(content=pdf)
    response['Content-Type'] = 'application/pdf'
    response['Content-Disposition'] =\
        f"attachment; filename*=UTF-8''{quote(filename.encode('utf-8'))}"
    return response
