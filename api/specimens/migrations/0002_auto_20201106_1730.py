# Generated by Django 3.1.3 on 2020-11-06 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('specimens', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='specimen',
            name='collecter',
            field=models.CharField(blank=True, default='', max_length=50, null=True, verbose_name='採集者'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='collection_code',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='標本ID'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='day',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='採集日'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='disposition',
            field=models.CharField(blank=True, default='', max_length=30, null=True, verbose_name='現在の標本の状況'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='establishment_means',
            field=models.CharField(blank=True, default='', max_length=20, null=True, verbose_name='生成プロセス'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='identified_by',
            field=models.CharField(blank=True, default='', max_length=50, null=True, verbose_name='同定者'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='institution_code',
            field=models.CharField(blank=True, default='', max_length=50, null=True, verbose_name='機関コード'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='lifestage',
            field=models.CharField(blank=True, default='', max_length=20, null=True, verbose_name='ライフステージ'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='month',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='採集月'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='note',
            field=models.TextField(blank=True, default='', max_length=200, null=True, verbose_name='備考'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='preparation_type',
            field=models.CharField(blank=True, default='dry specimens', max_length=20, null=True, verbose_name='標本の種類'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='rights',
            field=models.CharField(blank=True, default='', max_length=10, null=True, verbose_name='ライセンス'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='sampling_effort',
            field=models.TextField(blank=True, default='', null=True, verbose_name='採集中の作業メモ'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='sampling_protocol',
            field=models.TextField(blank=True, default='', null=True, verbose_name='採集方法'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='sex',
            field=models.CharField(blank=True, default='U', max_length=1, null=True, verbose_name='性別'),
        ),
        migrations.AlterField(
            model_name='specimen',
            name='year',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='採集年'),
        ),
    ]