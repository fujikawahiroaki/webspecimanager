# Generated by Django 3.1.3 on 2020-11-07 00:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('specimens', '0002_auto_20201106_1730'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='specimen',
            name='taxon_info',
        ),
    ]