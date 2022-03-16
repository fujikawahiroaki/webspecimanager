from contextlib import AsyncExitStack
from urllib import request
import pytest
import uuid
from rest_framework import serializers
from django.http import HttpRequest
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models import PointField
from django.core.validators import RegexValidator
from django.conf import settings
from django.test import RequestFactory
from django_countries.serializer_fields import CountryField
from django_countries.serializers import CountryFieldMixin
from drf_extra_fields.geo_fields import PointField
from drf_extra_fields.fields import Base64ImageField
from django.contrib.gis.geos import Point
from django.contrib.auth.models import User
from collect_points.serializers import CollectPointSerializer
from model_bakery import baker
from collect_points.models import CollectPoint

pytestmark = pytest.mark.django_db


class TestCollectPointSerializer:
    @pytest.mark.unit
    def test_serialize_model(self):
        collectpoint = baker.prepare(CollectPoint)
        serializer = CollectPointSerializer(collectpoint)
        assert serializer.data
    
    @pytest.mark.unit
    def test_serialized_data(self, mocker):
        valid_serialized_data = baker.make(CollectPoint, make_m2m=True, _fill_optional=True, country='JP').__dict__
        valid_serialized_data['location'] = {'longitude': 0.0, 'latitude': 0.0}
        request = HttpRequest()
        user = settings.AUTH_USER_MODEL
        rf = RequestFactory().get("/api/collect-points/own-collect-points/")
        rf.user = user
        serializer = CollectPointSerializer(data=valid_serialized_data, context={"request": rf})
        assert serializer.is_valid()
        assert serializer.errors == {}
        