# Generated by Django 3.1.3 on 2020-11-14 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('specimens', '0004_auto_20201107_0933'),
    ]

    operations = [
        migrations.AddField(
            model_name='specimen',
            name='collection_name',
            field=models.CharField(blank=True, default='', max_length=50, null=True, verbose_name='コレクション名'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='sampling_effort',
            field=models.TextField(blank=True, default='', max_length=100, null=True, verbose_name='採集中の作業メモ'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='sampling_protocol',
            field=models.CharField(blank=True, default='', max_length=20, null=True, verbose_name='採集方法'),
        ),
    ]
