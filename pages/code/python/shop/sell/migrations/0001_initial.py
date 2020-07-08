# Generated by Django 3.0.7 on 2020-07-07 22:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=50)),
                ('image', models.ImageField(blank=True, default='default.png', upload_to='item_pics')),
                ('description', models.TextField(blank=True)),
                ('seller_name', models.CharField(max_length=100)),
                ('phone', models.DecimalField(decimal_places=0, max_digits=10)),
                ('email', models.EmailField(max_length=100)),
                ('date_posted', models.DateTimeField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
