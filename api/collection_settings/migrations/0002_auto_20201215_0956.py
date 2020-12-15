# Generated by Django 3.1.3 on 2020-12-15 00:56

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collection_settings', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collectionsetting',
            name='latest_collection_code',
            field=models.IntegerField(blank=True, default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(999999999999999999)], verbose_name='標本IDの最終番号'),
        ),
    ]
