# Generated by Django 3.1.3 on 2021-01-10 03:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('contient', models.CharField(blank=True, default='', max_length=20, verbose_name='大陸')),
                ('island_group', models.CharField(blank=True, default='', max_length=30, verbose_name='島郡')),
                ('island', models.CharField(blank=True, default='', max_length=24, verbose_name='島')),
                ('country', django_countries.fields.CountryField(blank=True, default='', max_length=2, verbose_name='国名コード(2文字 ISO 3166-1)')),
                ('state_provice', models.CharField(blank=True, default='', max_length=30, verbose_name='県(州)')),
                ('identified_by', models.CharField(blank=True, default='', max_length=19, verbose_name='同定者')),
                ('collecter', models.CharField(blank=True, default='', max_length=18, verbose_name='採集者')),
                ('preparation_type', models.CharField(blank=True, default='dry specimens', max_length=20, verbose_name='標本の種類')),
                ('disposition', models.CharField(blank=True, default='', max_length=30, verbose_name='現在の標本の状況')),
                ('lifestage', models.CharField(blank=True, default='', max_length=20, verbose_name='ライフステージ')),
                ('establishment_means', models.CharField(blank=True, default='', max_length=20, verbose_name='生成プロセス')),
                ('rights', models.CharField(blank=True, default='', max_length=10, verbose_name='ライセンス')),
                ('kingdom', models.CharField(blank=True, default='Animalia', max_length=30, verbose_name='界')),
                ('phylum', models.CharField(blank=True, default='Arthropoda', max_length=30, verbose_name='門')),
                ('class_name', models.CharField(blank=True, default='Insecta', max_length=30, verbose_name='鋼')),
                ('order', models.CharField(blank=True, default='', max_length=30, verbose_name='目')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_profiles', to=settings.AUTH_USER_MODEL, verbose_name='ユーザーモデル')),
            ],
            options={
                'db_table': 'user_profiles',
                'ordering': ['-created_at'],
            },
        ),
    ]
