from django.db import models
from django.conf import settings
import uuid
from my_utils.file_tools import user_portfolio_directory_path


class Taxon(models.Model):
    """分類情報"""
    class Meta:
        db_table = 'taxa'
        ordering = ['-created_at']

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    # ソート用に更新日時を利用
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='taxa',
        null=True,
        on_delete=models.CASCADE
    )
    # 以下、分類データのカラムをGBIFベースで定義
    # カラム項目はDarwin Core 1.2に概ね準拠
    # カラム名はDarwin Core 1.2をPEP8準拠の表記に変更したもの
    # 名前がよりシンプルになるものは一部Darwin Core 最新版に準拠
    # 以下、コメント内ではDarwin CoreをDCと略記
    # 界
    kingdom = models.CharField(verbose_name='界',
                               max_length=30, blank=True, null=True)
    # 門
    phylum = models.CharField(verbose_name='門',
                              max_length=30, blank=True, null=True)
    # 鋼 予約語とか被るため_nameを付与
    class_name = models.CharField(verbose_name='鋼',
                                  max_length=30, blank=True, null=True)
    # 目
    order = models.CharField(verbose_name='目',
                             max_length=30, blank=True, null=True)
    # 亜目(オリジナル)
    suborder = models.CharField(verbose_name='亜目',
                                max_length=30, blank=True, null=True)
    # 科
    family = models.CharField(verbose_name='科',
                              max_length=30, blank=True, null=True)
    # 亜科(オリジナル)
    subfamily = models.CharField(verbose_name='亜科',
                                 max_length=30, blank=True, null=True)
    # 族(オリジナル)
    tribe = models.CharField(verbose_name='族',
                             max_length=30, blank=True, null=True)
    # 亜族(オリジナル)
    subtribe = models.CharField(verbose_name='亜族',
                                max_length=30, blank=True, null=True)
    # 属
    genus = models.CharField(verbose_name='属',
                             max_length=30, blank=True, null=True)
    # 亜属
    subgenus = models.CharField(verbose_name='亜属',
                                max_length=30, blank=True, null=True)
    # 種
    species = models.CharField(verbose_name='種',
                               max_length=30, blank=True, null=True)
    # 亜種
    subspecies = models.CharField(verbose_name='亜種',
                                  max_length=30, blank=True, null=True)
    # 記載者
    scientific_name_author = models.CharField(verbose_name='記載者',
                                              max_length=50,
                                              blank=True, null=True)
    # 記載年 DC最新版準拠
    name_publishedin_year = models.IntegerField(verbose_name='記載年',
                                                blank=True, null=True)
    # 以上、GBIFベースでのカラム定義終了
    # 以下はオリジナルのカラム
    # 和名
    japanese_name = models.CharField(verbose_name='和名',
                                     max_length=30, blank=True,
                                     null=True)
    # 分布
    distribution = models.CharField(verbose_name='分布',
                                    max_length=100, blank=True,
                                    null=True)
    # 備考
    note = models.TextField(verbose_name='備考', max_length=200,
                            blank=True, null=True)
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
        if self.genus == '':
            return 'Unidentified'
        else:
            return self.genus + self.species