from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django_countries.fields import CountryField
import uuid


class UserProfile(models.Model):
    """ユーザープロファイル"""
    class Meta:
        db_table = 'user_profiles'
        ordering = ['-created_at']

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    # ソート用に更新日時を利用
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='user_profiles',
        null=True,
        on_delete=models.CASCADE,
        verbose_name='ユーザーモデル'
    )
    # 以下、各種項目入力候補となるデフォルト値設定カラム
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
    # 機関コード
    institution_code = models.CharField(verbose_name='機関コード',
                                        max_length=10, blank=True,
                                        default='')
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
    # 採集者
    collecter = models.CharField(verbose_name='採集者',
                                 default='',
                                 max_length=18, blank=True)
    # 標本の種類(乾燥、液浸など)
    preparation_type = models.CharField(verbose_name='標本の種類',
                                        default='dry specimens',
                                        max_length=20, blank=True)
    # 現在の標本の状況 DC最新版準拠
    disposition = models.CharField(verbose_name='現在の標本の状況',
                                   default='',
                                   max_length=30, blank=True)
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
    # 界
    kingdom = models.CharField(verbose_name='界',
                               default='Animalia',
                               max_length=30, blank=True)
    # 門
    phylum = models.CharField(verbose_name='門',
                              default='Arthropoda',
                              max_length=30, blank=True)
    # 鋼 予約語と被るため_nameを付与
    class_name = models.CharField(verbose_name='鋼',
                                  default='Insecta',
                                  max_length=30, blank=True)
    # 目
    order = models.CharField(verbose_name='目',
                             default='',
                             max_length=30, blank=True)
