# Generated by Django 3.1.3 on 2021-01-10 03:26

import datetime
from django.conf import settings
import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion
import my_utils.file_tools
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tour',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(blank=True, default='', max_length=30, verbose_name='採集行のタイトル')),
                ('start_date', models.DateField(blank=True, default=datetime.date.today, verbose_name='採集行開始日')),
                ('end_date', models.DateField(blank=True, default=datetime.date.today, verbose_name='採集行終了日')),
                ('track', django.contrib.gis.db.models.fields.LineStringField(blank=True, geography=True, null=True, srid=4326)),
                ('note', models.TextField(blank=True, default='', max_length=200, verbose_name='備考')),
                ('image1', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image2', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image3', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image4', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('image5', models.ImageField(blank=True, null=True, upload_to=my_utils.file_tools.user_portfolio_directory_path)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tours', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'tours',
                'ordering': ['-created_at'],
            },
        ),
    ]
