# Generated by Django 3.1.3 on 2020-12-14 11:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('collection_settings', '0001_initial'),
        ('specimens', '0006_auto_20201211_1812'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='specimen',
            name='collection_name',
        ),
        migrations.RemoveField(
            model_name='specimen',
            name='institution_code',
        ),
        migrations.AddField(
            model_name='specimen',
            name='collection_settings_info',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='collection_settings.collectionsetting', verbose_name='コレクション設定情報'),
        ),
    ]