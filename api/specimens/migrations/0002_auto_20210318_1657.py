# Generated by Django 3.1.3 on 2021-03-18 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('specimens', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='specimen',
            name='identified_by',
            field=models.CharField(blank=True, default='', max_length=18, verbose_name='同定者'),
        ),
    ]