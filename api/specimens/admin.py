from django.contrib import admin

from .models import Specimen
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin
admin.register(Specimen)
