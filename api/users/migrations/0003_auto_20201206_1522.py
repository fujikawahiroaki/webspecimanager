# Generated by Django 3.1.3 on 2020-12-06 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20201107_0933'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uesrprofile',
            name='class_name',
            field=models.CharField(blank=True, default='Insecta', max_length=30, verbose_name='鋼'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='collecter',
            field=models.CharField(blank=True, default='', max_length=50, verbose_name='採集者'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='collection_code',
            field=models.IntegerField(blank=True, default=0, verbose_name='標本ID'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='contient',
            field=models.CharField(blank=True, default='', max_length=20, verbose_name='大陸'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='country',
            field=models.CharField(blank=True, default='', max_length=2, verbose_name='国名コード(2文字 ISO 3166-1)'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='disposition',
            field=models.CharField(blank=True, default='', max_length=30, verbose_name='現在の標本の状況'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='establishment_means',
            field=models.CharField(blank=True, default='', max_length=20, verbose_name='生成プロセス'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='identified_by',
            field=models.CharField(blank=True, default='', max_length=50, verbose_name='同定者'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='institution_code',
            field=models.CharField(blank=True, default='', max_length=50, verbose_name='機関コード'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='island',
            field=models.CharField(blank=True, default='', max_length=50, verbose_name='島'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='island_group',
            field=models.CharField(blank=True, default='', max_length=50, verbose_name='島郡'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='kingdom',
            field=models.CharField(blank=True, default='Animalia', max_length=30, verbose_name='界'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='lifestage',
            field=models.CharField(blank=True, default='', max_length=20, verbose_name='ライフステージ'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='order',
            field=models.CharField(blank=True, default='', max_length=30, verbose_name='目'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='phylum',
            field=models.CharField(blank=True, default='Arthropoda', max_length=30, verbose_name='門'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='preparation_type',
            field=models.CharField(blank=True, default='dry specimens', max_length=20, verbose_name='標本の種類'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='rights',
            field=models.CharField(blank=True, default='', max_length=10, verbose_name='ライセンス'),
        ),
        migrations.AlterField(
            model_name='uesrprofile',
            name='state_provice',
            field=models.CharField(blank=True, default='', max_length=50, verbose_name='県(州)'),
        ),
    ]