# Generated by Django 3.1.3 on 2020-11-06 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collect_points', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collectpoint',
            name='contient',
            field=models.CharField(blank=True, default='', max_length=20, null=True, verbose_name='大陸'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='coordinate_precision',
            field=models.FloatField(blank=True, default=0.0, null=True, verbose_name='採集地の範囲'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='country',
            field=models.CharField(blank=True, default='', max_length=2, null=True, verbose_name='国名コード(2文字 ISO 3166-1)'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='county',
            field=models.CharField(blank=True, default='', max_length=50, null=True, verbose_name='海外における郡・区(市より上の単位)'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='island',
            field=models.CharField(blank=True, default='', max_length=50, null=True, verbose_name='島'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='island_group',
            field=models.CharField(blank=True, default='', max_length=50, null=True, verbose_name='島郡'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='japanese_place_name',
            field=models.CharField(blank=True, default='', max_length=30, null=True, verbose_name='日本語地名'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='maximum_depth',
            field=models.FloatField(blank=True, default=0.0, null=True, verbose_name='採集地の水面からの最深の距離'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='maximum_elevation',
            field=models.FloatField(blank=True, default=0.0, null=True, verbose_name='採集地の最高海抜距離'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='minimum_depth',
            field=models.FloatField(blank=True, default=0.0, null=True, verbose_name='採集地の水面からの最浅の距離'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='minimum_elevation',
            field=models.FloatField(blank=True, default=0.0, null=True, verbose_name='採集地の最低海抜距離'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='municipality',
            field=models.CharField(blank=True, default='', max_length=50, null=True, verbose_name='市名以下の詳細地名'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='note',
            field=models.TextField(blank=True, default='', max_length=200, null=True, verbose_name='備考'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='state_provice',
            field=models.CharField(blank=True, default='', max_length=50, null=True, verbose_name='県(州)'),
        ),
        migrations.AlterField(
            model_name='collectpoint',
            name='verbatim_locality',
            field=models.TextField(blank=True, default='', null=True, verbose_name='採集地の説明'),
        ),
    ]
