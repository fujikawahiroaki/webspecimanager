from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.conf import settings
from location_field.models.spatial import LocationField
import uuid
from my_utils.file_tools import user_portfolio_directory_path


class CollectPoint(models.Model):
    """採集地点"""
    class Meta:
        db_table = 'collect_points'
        ordering = ['-created_at']
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    # ソート用に更新日時を利用
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='collect_points',
        null=True,
        on_delete=models.CASCADE
    )
    # 以下、分類データのカラムをGBIFベースで定義
    # カラム項目はDarwin Core 1.2に概ね準拠
    # カラム名はDarwin Core 1.2をPEP8準拠の表記に変更したもの
    # 名前がよりシンプルになるものは一部Darwin Core 最新版に準拠
    # 以下、コメント内ではDarwin CoreをDCと略記
    # 大陸
    contient = models.CharField(verbose_name='大陸', default='',
                                max_length=20, blank=True, null=True)
    # 島郡 DC最新版準拠
    island_group = models.CharField(verbose_name='島郡', default='',
                                    max_length=50, blank=True, null=True)
    # 島 DC最新版準拠
    island = models.CharField(verbose_name='島', default='',
                              max_length=50, blank=True, null=True)
    # 国名コード(ISO 3166-1基準の2文字のコード)
    country = models.CharField(verbose_name='国名コード(2文字 ISO 3166-1)',
                               default='',
                               max_length=2, blank=True, null=True)
    # 州・県など
    state_provice = models.CharField(verbose_name='県(州)',
                                     default='',
                                     max_length=50, blank=True, null=True)
    # 海外における郡・区など
    county = models.CharField(verbose_name='海外における郡・区(市より上の単位)',
                              default='',
                              max_length=50, blank=True, null=True)
    # 市名以下の詳細行政地名 DC最新版準拠
    municipality = models.CharField(verbose_name='市名以下の詳細地名',
                                    default='',
                                    max_length=50, blank=True, null=True)
    # 採集地の自由な説明
    verbatim_locality = models.TextField(verbose_name='採集地の説明',
                                         default='',
                                         blank=True, null=True)
    # 日本語地名(オリジナル)
    japanese_place_name = models.CharField(verbose_name='日本語地名',
                                           max_length=30, blank=True,
                                           default='',
                                           null=True)
    # 採集地の経度
    longitude = models.DecimalField(verbose_name='経度',
                                    max_digits=9,
                                    decimal_places=6,
                                    blank=True,
                                    null=True,
                                    default=0.0)
    # 採集地の緯度
    latitude = models.DecimalField(verbose_name='緯度',
                                   max_digits=9,
                                   decimal_places=6,
                                   blank=True,
                                   null=True,
                                   default=0.0)
    # 採集地の範囲(緯度・経度座標を囲んだ地域の半径をメートル単位で指定)
    coordinate_precision = models.FloatField(verbose_name='採集地の範囲',
                                             blank=True, null=True,
                                             default=0.0)
    # 地点情報(オリジナル)
    geom = models.PointField(srid=4326, blank=True, null=True)
    # 採集地の最低海抜距離(メートル)
    minimum_elevation = models.FloatField(verbose_name='採集地の最低海抜距離',
                                          blank=True, null=True,
                                          default=0.0)
    # 採集地の最高海抜距離(メートル)
    maximum_elevation = models.FloatField(verbose_name='採集地の最高海抜距離',
                                          blank=True, null=True,
                                          default=0.0)
    # 採集地の水面からの最浅の距離(メートル)
    minimum_depth = models.FloatField(verbose_name='採集地の水面からの最浅の距離',
                                      blank=True, null=True,
                                      default=0.0)
    # 採集地の水面からの最深の距離(メートル)
    maximum_depth = models.FloatField(verbose_name='採集地の水面からの最深の距離',
                                      blank=True, null=True,
                                      default=0.0)
    # 以下、オリジナルの定義
    # 備考
    note = models.TextField(verbose_name='備考', max_length=200,
                            blank=True, default='', null=True)
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
        return self.japanese_place_name
