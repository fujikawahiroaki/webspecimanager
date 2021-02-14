import uuid
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.conf import settings
# from location_field.models.spatial import LocationField
from django_countries.fields import CountryField
from my_utils.file_tools import user_portfolio_directory_path
from tours.models import Tour


class CollectPoint(models.Model):
    """採集地点モデル"""
    class Meta:
        db_table = 'collect_points'
        ordering = ['-created_at']

    id = models.UUIDField(default=uuid.uuid4, primary_key=True,
                          verbose_name='プライマリキー(UUID)')
    # ソート用に更新日時を利用
    created_at = models.DateTimeField(auto_now_add=True,
                                      verbose_name='更新日時')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        related_name='collect_points',
        on_delete=models.CASCADE,
        verbose_name='ユーザーモデル'
    )
    tour = models.ManyToManyField(Tour, verbose_name='所属する採集行',
                                  related_name='tours',
                                  blank=True)
    # 以下、分類データのカラムをGBIFベースで定義
    # カラム項目はDarwin Core 1.2に概ね準拠
    # カラム名はDarwin Core 1.2をPEP8準拠の表記に変更したもの
    # 名前がよりシンプルになるものは一部Darwin Core 最新版に準拠
    # 以下、コメント内ではDarwin CoreをDCと略記
    # 大陸
    contient = models.CharField(verbose_name='大陸', default='',
                                max_length=20, blank=True)
    # 島郡 DC最新版準拠
    island_group = models.CharField(verbose_name='島郡', default='',
                                    max_length=30, blank=True)
    # 島 DC最新版準拠
    island = models.CharField(verbose_name='島', default='',
                              max_length=24, blank=True)
    # 国名コード(ISO 3166-1基準の2文字のコード)
    country = CountryField(verbose_name='国名コード(2文字 ISO 3166-1)',
                           default='',
                           max_length=2, blank=True)
    # 州・県など
    state_provice = models.CharField(verbose_name='県(州)',
                                     default='',
                                     max_length=30, blank=True)
    # 海外における郡・区など
    county = models.CharField(verbose_name='海外における郡・区(市より上の単位)',
                              default='',
                              max_length=30, blank=True)
    # 市名以下の詳細行政地名 DC最新版準拠
    municipality = models.CharField(verbose_name='市名以下の詳細地名(カンマ+半角スペースで区切る)',
                                    default='',
                                    max_length=50, blank=True)
    # 採集地の自由な説明
    verbatim_locality = models.TextField(verbose_name='採集地の説明',
                                         default='',
                                         max_length=200,
                                         blank=True)
    # 日本語地名(オリジナル)
    japanese_place_name = models.CharField(verbose_name='日本語地名(ラベル用・最小限)',
                                           max_length=14, blank=True,
                                           default='')
    # 日本語地名詳細(オリジナル)
    japanese_place_name_detail = models.CharField(verbose_name='日本語地名(詳細)',
                                                  max_length=50, blank=True,
                                                  default='')
    # 採集地の範囲(緯度・経度座標を囲んだ地域の半径をメートル単位で指定)
    coordinate_precision = models.FloatField(verbose_name='採集地の範囲',
                                             blank=True,
                                             default=0.0)
    # 地点情報(オリジナル)
    location = models.PointField(srid=4326, geography=True,
                                 default=Point(0.0, 0.0),
                                 blank=True)
    # 採集地の最低海抜距離(メートル)
    minimum_elevation = models.FloatField(verbose_name='採集地の最低海抜距離',
                                          blank=True,
                                          default=0.0)
    # 採集地の最高海抜距離(メートル)
    maximum_elevation = models.FloatField(verbose_name='採集地の最高海抜距離',
                                          blank=True,
                                          default=0.0)
    # 採集地の水面からの最浅の距離(メートル)
    minimum_depth = models.FloatField(verbose_name='採集地の水面からの最浅の距離',
                                      blank=True,
                                      default=0.0)
    # 採集地の水面からの最深の距離(メートル)
    maximum_depth = models.FloatField(verbose_name='採集地の水面からの最深の距離',
                                      blank=True,
                                      default=0.0)
    # 以下、オリジナルの定義
    # 備考
    note = models.TextField(verbose_name='備考', max_length=200,
                            blank=True, default='')
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

    @property
    def longitude(self):
        return self.location.x

    @property
    def latitude(self):
        return self.location.y

    def __str__(self):
        return self.japanese_place_name
