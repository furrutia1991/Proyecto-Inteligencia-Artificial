# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='enlace',
            name='categoria',
            field=models.ForeignKey(default=0, to='app.Categoria'),
            preserve_default=False,
        ),
    ]
