# Generated by Django 2.0.1 on 2018-12-19 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('front_page', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='berita',
            name='tanggal',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='peta',
            name='tanggal',
            field=models.DateField(),
        ),
    ]
