# Generated by Django 3.1.3 on 2021-01-10 03:26

from django.conf import settings
import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields
import my_utils.file_tools
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tours', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CollectPoint',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, verbose_name='プライマリキー(UUID)')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='更新日時')),
                ('contient', models.CharField(blank=True, default='', max_length=20, verbose_name='大陸')),
                ('island_group', models.CharField(blank=True, default='', max_length=30, verbose_name='島郡')),
                ('island', models.CharField(blank=True, default='', max_length=24, verbose_name='島')),
                ('country', django_countries.fields.CountryField(blank=True, default='', max_length=2, verbose_name='国名コード(2文字 ISO 3166-1)')),
                ('state_provice', models.CharField(blank=True, default='', max_length=30, verbose_name='県(州)')),
                ('county', models.CharField(blank=True, default='', max_length=30, verbose_name='海外における郡・区(市より上の単位)')),
                ('municipality', models.CharField(blank=True, default='', max_length=50, verbose_name='市名以下の詳細地名(カンマ+半角スペースで区切る)')),
                ('verbatim_locality', models.TextField(blank=True, default='', max_length=200, verbose_name='採集地の説明')),
                ('japanese_place_name', models.CharField(blank=True, default='', max_length=14, verbose_name='日本語地名(ラベル用・最小限)')),
                ('japanese_place_name_detail', models.CharField(blank=True, default='', max_length=50, verbose_name='日本語地名(詳細)')),
                ('coordinate_precision', models.FloatField(blank=True, default=0.0, verbose_name='採集地の範囲')),
                ('location', django.contrib.gis.db.models.fields.PointField(blank=True, default=django.contrib.gis.geos.point.Point(0.0, 0.0), geography=True, srid=4326)),
                ('minimum_elevation', models.FloatField(blank=True, default=0.0, verbose_name='採集地の最低海抜距離')),
                ('maximum_elevation', models.FloatField(blank=True, default=0.0, verbose_name='採集地の最高海抜距離')),
                ('minimum_depth', models.FloatField(blank=True, default=0.0, verbose_name='採集地の水面からの最浅の距離')),
                ('maximum_depth', models.FloatField(blank=True, default=0.0, verbose_name='採集地の水面からの最深の距離')),
                ('note', models.TextField(blank=True, default='', max_length=200, verbose_name='備考')),
                ('image1', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image2', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image3', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image4', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image5', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('tour', models.ManyToManyField(blank=True, related_name='tours', to='tours.Tour', verbose_name='所属する採集行')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='collect_points', to=settings.AUTH_USER_MODEL, verbose_name='ユーザーモデル')),
            ],
            options={
                'db_table': 'collect_points',
                'ordering': ['-created_at'],
            },
        ),
    ]
