# Generated by Django 3.1.3 on 2021-01-10 03:26

import datetime
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import my_utils.file_tools
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('collection_settings', '0001_initial'),
        ('taxa', '0001_initial'),
        ('collect_points', '0001_initial'),
        ('tours', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Specimen',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('date_last_modified', models.DateTimeField(auto_now_add=True, verbose_name='最終更新日時')),
                ('collection_code', models.IntegerField(blank=True, default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(999999999999999999)], verbose_name='標本ID')),
                ('identified_by', models.CharField(blank=True, default='', max_length=19, verbose_name='同定者')),
                ('date_identified', models.DateField(blank=True, default=datetime.date.today, verbose_name='同定年月日')),
                ('collecter', models.CharField(blank=True, default='', max_length=18, verbose_name='採集者')),
                ('year', models.IntegerField(blank=True, default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(9999)], verbose_name='採集年(不明な場合0を指定)')),
                ('month', models.IntegerField(blank=True, default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(12)], verbose_name='採集月(不明な場合0を指定)')),
                ('day', models.IntegerField(blank=True, default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(31)], verbose_name='採集日(不明な場合0を指定)')),
                ('sex', models.CharField(blank=True, default='U', max_length=1, verbose_name='性別')),
                ('preparation_type', models.CharField(blank=True, default='dry specimens', max_length=20, verbose_name='標本の種類')),
                ('disposition', models.CharField(blank=True, default='', max_length=30, verbose_name='現在の標本の状況')),
                ('sampling_protocol', models.CharField(blank=True, default='', max_length=20, verbose_name='採集方法')),
                ('sampling_effort', models.TextField(blank=True, default='', max_length=100, verbose_name='採集中の作業メモ')),
                ('lifestage', models.CharField(blank=True, default='', max_length=20, verbose_name='ライフステージ')),
                ('establishment_means', models.CharField(blank=True, default='', max_length=20, verbose_name='生成プロセス')),
                ('rights', models.CharField(blank=True, default='', max_length=10, verbose_name='ライセンス')),
                ('note', models.TextField(blank=True, default='', max_length=200, verbose_name='備考')),
                ('image1', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image2', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image3', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image4', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image5', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('collect_point_info', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='collect_points.collectpoint', verbose_name='採集地点情報')),
                ('collection_settings_info', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='collection_settings.collectionsetting', verbose_name='コレクション設定情報')),
                ('custom_taxon_info', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='custom_taxa', to='taxa.customtaxon', verbose_name='カスタム分類情報')),
                ('default_taxon_info', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='default_taxa', to='taxa.defaulttaxon', verbose_name='デフォルト分類情報')),
                ('tour', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='tours.tour', verbose_name='採集行')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='specimens', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'specimens',
                'ordering': ['-date_last_modified'],
            },
        ),
    ]
