# Generated by Django 3.1.3 on 2020-11-16 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('specimens', '0002_auto_20201114_1734'),
    ]

    operations = [
        migrations.AlterField(
            model_name='specimen',
            name='date_identified',
            field=models.DateField(blank=True, null=True, verbose_name='同定年月日'),
        ),
    ]