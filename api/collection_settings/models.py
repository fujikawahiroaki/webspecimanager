import uuid
from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator


class CollectionSetting(models.Model):
    """コレクション設定"""

    class Meta:
        db_table = 'collection_settings'
        ordering = ['-created_at']

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    # ソート用に更新日時を利用
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='collection_settings',
        null=True,
        on_delete=models.CASCADE,
        verbose_name='ユーザーモデル'
    )
    # コレクション名のフルネーム
    collection_name = models.CharField(verbose_name='コレクション名',
                                       max_length=174, blank=True,
                                       default='')
    # 機関コード
    institution_code = models.CharField(verbose_name='機関コード',
                                        max_length=10, blank=True,
                                        default='')
    # 標本IDの最終番号
    latest_collection_code = models.IntegerField(verbose_name='標本IDの最終番号',
                                                 blank=True,
                                                 validators=[MinValueValidator(0),
                                                             MaxValueValidator(999999999999999999)],
                                                 default=0)
    # 備考
    note = models.TextField(verbose_name='備考', max_length=200,
                            default='', blank=True)

    def __str__(self):
        return self.collection_name
