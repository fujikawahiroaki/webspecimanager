import datetime
from django.contrib.gis.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
import uuid
from my_utils.file_tools import user_portfolio_directory_path
from taxa.models import CustomTaxon, DefaultTaxon
from tours.models import Tour
from collect_points.models import CollectPoint
from collection_settings.models import CollectionSetting


class Specimen(models.Model):
    """標本情報"""
    class Meta:
        db_table = 'specimens'
        ordering = ['-date_last_modified']

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    # レコードの最終更新日
    # シリアライザーで読み込み専用にする
    # ソートにも利用 ネーミングはGBIFに寄せた
    date_last_modified = models.DateTimeField(verbose_name='最終更新日時',
                                              auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='specimens',
        null=True,
        on_delete=models.CASCADE
    )
    # 以下、標本データのカラムをGBIFベースで定義
    # 分類情報と採集地点情報は別モデルの外部キー
    # カラム項目はDarwin Core 1.2に概ね準拠
    # カラム名はDarwin Core 1.2をPEP8準拠の表記に変更したもの
    # 名前がよりシンプルになるものは一部Darwin Core 最新版に準拠
    # 以下、コメント内ではDarwin CoreをDCと略記

    # カスタム分類情報 外部キーのためこのカラム名はGBIF無関係
    custom_taxon_info = models.ForeignKey(CustomTaxon, verbose_name='カスタム分類情報',
                                          related_name='custom_taxa',
                                          null=True, on_delete=models.SET_NULL)
    # デフォルト分類情報 外部キーのためこのカラム名はGBIF無関係
    default_taxon_info = models.ForeignKey(DefaultTaxon,
                                           verbose_name='デフォルト分類情報',
                                           related_name='default_taxa',
                                           null=True,
                                           on_delete=models.SET_NULL)
    # 採集地点情報 外部キーのためこのカラム名はGBIF無関係
    collect_point_info = models.ForeignKey(CollectPoint,
                                           verbose_name='採集地点情報',
                                           null=True,
                                           on_delete=models.SET_NULL)
    # コレクション設定情報 外部キーのためこのカラム名はGBIF無関係
    collection_settings_info = models.ForeignKey(CollectionSetting,
                                                 verbose_name='コレクション設定情報',
                                                 null=True,
                                                 on_delete=models.SET_NULL)
    # 標本ID
    collection_code = models.IntegerField(verbose_name='標本ID',
                                          blank=True,
                                          validators=[MinValueValidator(0),
                                                      MaxValueValidator(999999999999999999)],
                                          default=0)
    # 同定者
    identified_by = models.CharField(verbose_name='同定者',
                                     max_length=19, blank=True,
                                     default='')
    # 同定年月日
    # 年月日がセットになっているDC最新版に準拠
    date_identified = models.DateField(verbose_name='同定年月日',
                                       default=datetime.date.today,
                                       blank=True)
    # 採集者
    collecter = models.CharField(verbose_name='採集者',
                                 default='',
                                 max_length=18, blank=True)
    # 採集年
    # 項目名のシンプルなDC最新版に準拠
    year = models.IntegerField(verbose_name='採集年(不明な場合0を指定)',
                               default=0,
                               validators=[MinValueValidator(0),
                                           MaxValueValidator(9999)],
                               blank=True)
    # 採集月
    # 同上
    month = models.IntegerField(verbose_name='採集月(不明な場合0を指定)',
                                default=0,
                                validators=[MinValueValidator(0),
                                            MaxValueValidator(12)],
                                blank=True)
    # 採集日
    # 同上
    day = models.IntegerField(verbose_name='採集日(不明な場合0を指定)',
                              default=0,
                              validators=[MinValueValidator(0),
                                          MaxValueValidator(31)],
                              blank=True)
    # 標本の性別
    # M=オス、F=メス、H=両性、I=不確定、U=不明、T=転移
    sex = models.CharField(verbose_name='性別', default='U',
                           max_length=1, blank=True)
    # 標本の種類(乾燥、液浸など)
    preparation_type = models.CharField(verbose_name='標本の種類',
                                        default='dry specimens',
                                        max_length=20, blank=True)
    # 現在の標本の状況 DC最新版準拠
    disposition = models.CharField(verbose_name='現在の標本の状況',
                                   default='',
                                   max_length=30, blank=True)
    # 採集方法 DC最新版準拠
    sampling_protocol = models.CharField(verbose_name='採集方法',
                                         default='', max_length=20,
                                         blank=True)
    # 採集中の作業メモ DC最新版準拠
    sampling_effort = models.TextField(verbose_name='採集中の作業メモ',
                                       default='', max_length=100,
                                       blank=True)
    # ライフステージ DC最新版準拠
    lifestage = models.CharField(verbose_name='ライフステージ',
                                 default='',
                                 max_length=20, blank=True)
    # 生成プロセス(wildなど)
    establishment_means = models.CharField(verbose_name='生成プロセス',
                                           default='',
                                           max_length=20, blank=True)
    # ライセンス
    rights = models.CharField(verbose_name='ライセンス',
                              default='',
                              max_length=10, blank=True)
    # 以上でGBIFベースの標本データカラム定義終了
    # 以下はオリジナルの定義
    # 所属する採集行
    tour = models.ForeignKey(Tour, verbose_name='採集行',
                             on_delete=models.SET_NULL, null=True)
    # 備考
    note = models.TextField(verbose_name='備考', max_length=200,
                            default='',
                            blank=True)
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

    def make_taxon_field(self, field_name):
        if self.custom_taxon_info is None and \
           self.default_taxon_info is not None:
            return getattr(self.default_taxon_info, field_name)
        elif self.custom_taxon_info is not None:
            return getattr(self.custom_taxon_info, field_name)
        else:
            return ''

    @property
    def name(self):
        if self.collection_settings_info is not None:
            return self.collection_settings_info.institution_code + \
                ' ' + str(self.collection_code).zfill(6)
        else:
            return 'Colletion: ? ' + str(self.collection_code).zfill(6)

    @property
    def kingdom(self):
        return self.make_taxon_field('kingdom')

    @property
    def phylum(self):
        return self.make_taxon_field('phylum')

    @property
    def class_name(self):
        return self.make_taxon_field('class_name')

    @property
    def order(self):
        return self.make_taxon_field('order')

    @property
    def suborder(self):
        return self.make_taxon_field('suborder')

    @property
    def family(self):
        return self.make_taxon_field('family')

    @property
    def subfamily(self):
        return self.make_taxon_field('subfamily')

    @property
    def tribe(self):
        return self.make_taxon_field('tribe')

    @property
    def subtribe(self):
        return self.make_taxon_field('subtribe')

    @property
    def genus(self):
        return self.make_taxon_field('genus')

    @property
    def subgenus(self):
        return self.make_taxon_field('subgenus')

    @property
    def species(self):
        return self.make_taxon_field('species')

    @property
    def subspecies(self):
        return self.make_taxon_field('subspecies')

    @property
    def scientific_name_author(self):
        return self.make_taxon_field('scientific_name_author')

    @property
    def name_publishedin_year(self):
        return self.make_taxon_field('name_publishedin_year')

    @property
    def japanese_name(self):
        return self.make_taxon_field('japanese_name')

    def __str__(self):
        if self.collection_settings_info is not None:
            return self.collection_settings_info.institution_code + \
                ' ' + str(self.collection_code).zfill(6)
        else:
            return 'Colletion: ? ' + str(self.collection_code).zfill(6)
