from django.contrib import admin
from .models import DefaultTaxon, CustomTaxon


admin.register(DefaultTaxon, CustomTaxon)
