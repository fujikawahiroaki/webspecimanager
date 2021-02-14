import datetime
import uuid
from django.conf import settings
from django.contrib.gis.db import models
from django.contrib.gis.geos import LineString
from my_utils.file_tools import user_portfolio_directory_path


class Tour(models.Model):
    """採集行"""
    class Meta:
        db_table = 'tours'
        ordering = ['-created_at']

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    # ソート用に更新日時を利用
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='tours',
        null=True,
        on_delete=models.CASCADE)
    # 採集行のタイトル
    title = models.CharField(verbose_name='採集行のタイトル',
                             max_length=30, blank=True,
                             default='')
    # 採集行開始日
    start_date = models.DateField(verbose_name='採集行開始日',
                                  default=datetime.date.today,
                                  blank=True)
    # 採集行終了日
    end_date = models.DateField(verbose_name='採集行終了日',
                                default=datetime.date.today,
                                blank=True)
    # 採集ルートのトラック
    track = models.LineStringField(srid=4326, geography=True,
                                   blank=True, null=True)
    # 所属する標本データ
    # 採集ルート等をgeojsonで保持するフィールドを作る予定
    # 備考
    note = models.TextField(verbose_name='備考', max_length=200,
                            default='', blank=True)
    # 画像
    image1 = models.ImageField(upload_to=user_portfolio_directory_path,
                               null=True, blank=True)
    image2 = models.ImageField(upload_to=user_portfolio_directory_path,
                               null=True, blank=True)
    image3 = models.ImageField(upload_to=user_portfolio_directory_path,
                               null=True, blank=True)
    image4 = models.ImageField(upload_to=user_portfolio_directory_path,
                               null=True, blank=True)
    image5 = models.ImageField(upload_to=user_portfolio_directory_path,
                               null=True, blank=True)

    def __str__(self):
        return self.title
