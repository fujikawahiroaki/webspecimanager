# Generated by Django 3.1.3 on 2020-11-23 08:33

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('specimens', '0003_auto_20201116_2047'),
    ]

    operations = [
        migrations.CreateModel(
            name='SpecimenLabel',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(blank=True, default='NO_NAME', max_length=30, verbose_name='ラベル名')),
                ('data_label_flag', models.BooleanField(default=True, verbose_name='データラベル作成の可否')),
                ('coll_label_flag', models.BooleanField(default=True, verbose_name='コレクションラベル作成の可否')),
                ('det_label_flag', models.BooleanField(default=True, verbose_name='同定ラベル作成の可否')),
                ('note_label_flag', models.BooleanField(default=True, verbose_name='備考ラベル作成の可否')),
                ('label_specimens', models.ManyToManyField(blank=True, related_name='label_specimens', to='specimens.Specimen', verbose_name='標本データ')),
            ],
            options={
                'db_table': 'specimen_labels',
                'ordering': ['-created_at'],
            },
        ),
    ]
