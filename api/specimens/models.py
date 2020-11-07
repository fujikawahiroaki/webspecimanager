from django.contrib.gis.db import models
from django.conf import settings
import uuid
from my_utils.file_tools import user_portfolio_directory_path
from taxa.models import CustomTaxon, DefaultTaxon
from tours.models import Tour
from collect_points.models import CollectPoint


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
                                          null=True, on_delete=models.SET_NULL)
    # デフォルト分類情報 外部キーのためこのカラム名はGBIF無関係
    default_taxon_info = models.ForeignKey(DefaultTaxon,
                                           verbose_name='デフォルト分類情報',
                                           null=True,
                                           on_delete=models.SET_NULL)
    # 採集地点情報 外部キーのためこのカラム名はGBIF無関係
    collect_point_info = models.ForeignKey(CollectPoint,
                                           verbose_name='採集地点情報',
                                           null=True,
                                           on_delete=models.SET_NULL)
    # 機関コード
    institution_code = models.CharField(verbose_name='機関コード',
                                        max_length=50, blank=True,
                                        default='', null=True)
    # 標本ID
    collection_code = models.IntegerField(verbose_name='標本ID',
                                          blank=True,
                                          default=0, null=True)
    # 同定者
    identified_by = models.CharField(verbose_name='同定者',
                                     max_length=50, blank=True,
                                     default='', null=True)
    # 同定年月日
    # 年月日がセットになっているDC最新版に準拠
    date_identified = models.DateTimeField(verbose_name='同定年月日',
                                           blank=True, null=True)
    # 採集者
    collecter = models.CharField(verbose_name='採集者',
                                 default='',
                                 max_length=50, blank=True, null=True)
    # 採集年
    # 項目名のシンプルなDC最新版に準拠
    year = models.IntegerField(verbose_name='採集年',
                               default=0,
                               blank=True, null=True)
    # 採集月
    # 同上
    month = models.IntegerField(verbose_name='採集月',
                                default=0,
                                blank=True, null=True)
    # 採集日
    # 同上
    day = models.IntegerField(verbose_name='採集日',
                              default=0,
                              blank=True, null=True)
    # 標本の性別
    # M=オス、F=メス、H=両性、I=不確定、U=不明、T=転移
    sex = models.CharField(verbose_name='性別', default='U',
                           max_length=1, blank=True, null=True)
    # 標本の種類(乾燥、液浸など)
    preparation_type = models.CharField(verbose_name='標本の種類',
                                        default='dry specimens',
                                        max_length=20, blank=True, null=True)
    # 現在の標本の状況 DC最新版準拠
    disposition = models.CharField(verbose_name='現在の標本の状況',
                                   default='',
                                   max_length=30, blank=True, null=True)
    # 採集方法 DC最新版準拠
    sampling_protocol = models.TextField(verbose_name='採集方法',
                                         default='',
                                         blank=True, null=True)
    # 採集中の作業メモ DC最新版準拠
    sampling_effort = models.TextField(verbose_name='採集中の作業メモ',
                                       default='',
                                       blank=True, null=True)
    # ライフステージ DC最新版準拠
    lifestage = models.CharField(verbose_name='ライフステージ',
                                 default='',
                                 max_length=20, blank=True, null=True)
    # 生成プロセス(wildなど)
    establishment_means = models.CharField(verbose_name='生成プロセス',
                                           default='',
                                           max_length=20, blank=True,
                                           null=True)
    # ライセンス
    rights = models.CharField(verbose_name='ライセンス',
                              default='',
                              max_length=10, blank=True, null=True)
    # 以上でGBIFベースの標本データカラム定義終了
    # 以下はオリジナルの定義
    # 所属する採集行
    tour = models.ForeignKey(Tour, verbose_name='採集行',
                             on_delete=models.SET_NULL, null=True)
    # 備考
    note = models.TextField(verbose_name='備考', max_length=200,
                            default='',
                            blank=True, null=True)
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
        return self.institution_code + ' ' + str(self.collection_code).zfill(6)
