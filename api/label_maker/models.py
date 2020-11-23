import uuid
from django.db import models
from specimens.models import Specimen


class SpecimenLabel(models.Model):
    """標本ラベル"""
    class Meta:
        db_table = 'specimen_labels'
        ordering = ['-created_at']

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    # ソート用に更新日時を利用
    created_at = models.DateTimeField(auto_now_add=True)
    # ユーザーが設定したラベル名
    name = models.CharField(verbose_name='ラベル名',
                            default='NO_NAME',
                            max_length=30, blank=True)
    label_specimens = models.ManyToManyField(Specimen,
                                             related_name='label_specimens',
                                             verbose_name='標本データ',
                                             blank=True)
    data_label_flag = models.BooleanField(verbose_name='データラベル作成の可否',
                                          default=True)
    coll_label_flag = models.BooleanField(verbose_name='コレクションラベル作成の可否',
                                          default=True)
    det_label_flag = models.BooleanField(verbose_name='同定ラベル作成の可否',
                                         default=True)
    note_label_flag = models.BooleanField(verbose_name='備考ラベル作成の可否',
                                          default=True)

    @property
    def pdf_filename(self):
        return str(self.id) + '.pdf'
