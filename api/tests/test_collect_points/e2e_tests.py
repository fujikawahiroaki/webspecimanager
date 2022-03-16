from contextlib import AsyncExitStack
from email import header
from http.client import ResponseNotReady
from locale import currency
from model_bakery import baker
from django.core.serializers.json import DjangoJSONEncoder
import factory
import json
import pytest
import http
from config.settings import env
from collect_points.models import CollectPoint

pytestmark = pytest.mark.django_db


class TestCollectPointEndpoints:
    endpoint = '/api/collect-points/own-collect-points/'
    conn = http.client.HTTPSConnection(env('AUTH0_DOMAIN'))
    payload = f"{{\"client_id\":\"{env('AUTH0_CLIENT_ID')}\",\"client_secret\":\"{env('AUTH0_CLIENT_SECRET')}\",\"audience\":\"{env('AUTH0_AUDIENCE')}\",\"grant_type\":\"client_credentials\"}}"
    headers = {'content-type': "application/json"}
    conn.request("POST", "/oauth/token", payload, headers)
    auth_token = json.loads(
        conn.getresponse().read().decode("utf-8"))['access_token']

    def test_list(self, api_client):
        baker.make(CollectPoint, make_m2m=True, _fill_optional=True, _quantity=3)
        response = api_client().get(
            self.endpoint, HTTP_AUTHORIZATION=f"Bearer {self.auth_token}")
        assert response.status_code == 200
        assert len(json.loads(response.content)) == 4

    def test_create(self, api_client):
        collectpoint = baker.make(CollectPoint, make_m2m=True, _fill_optional=True, country='JP')
        expected_json = {
            'tour': [],
            'contient': collectpoint.contient,
            'island_group': collectpoint.island_group,
            'island': collectpoint.island,
            'country': collectpoint.country.code,
            'state_provice': collectpoint.state_provice,
            'county': collectpoint.county,
            'municipality': collectpoint.municipality,
            'verbatim_locality': collectpoint.verbatim_locality,
            'japanese_place_name': collectpoint.japanese_place_name,
            'japanese_place_name_detail': collectpoint.japanese_place_name_detail,
            'coordinate_precision': collectpoint.coordinate_precision,
            'location': {"latitude": collectpoint.location.y, "longitude": collectpoint.location.x},
            'minimum_elevation': collectpoint.minimum_elevation,
            'maximum_elevation': collectpoint.maximum_elevation,
            'minimum_depth': collectpoint.minimum_depth,
            'maximum_depth': collectpoint.maximum_depth,
            'note': collectpoint.note,
            'longitude': '{:.06f}'.format(collectpoint.longitude),
            'latitude': '{:.06f}'.format(collectpoint.latitude)
        }
        response = api_client().post(
            self.endpoint,
            data=expected_json,
            format='json',
            HTTP_AUTHORIZATION=f"Bearer {self.auth_token}"
        )
        assert response.status_code == 201
        response_dict = json.loads(response.content)
        response_dict.pop('id')
        response_dict.pop('created_at')
        response_dict.pop('image1')
        response_dict.pop('image2')
        response_dict.pop('image3')
        response_dict.pop('image4')
        response_dict.pop('image5')
        assert response_dict == expected_json

    def test_retrieve(self, api_client):
        collectpoint = baker.make(CollectPoint, make_m2m=True, _fill_optional=True, country='JP')
        expected_json = {
            'tour': [],
            'contient': collectpoint.contient,
            'island_group': collectpoint.island_group,
            'island': collectpoint.island,
            'country': collectpoint.country.code,
            'state_provice': collectpoint.state_provice,
            'county': collectpoint.county,
            'municipality': collectpoint.municipality,
            'verbatim_locality': collectpoint.verbatim_locality,
            'japanese_place_name': collectpoint.japanese_place_name,
            'japanese_place_name_detailL': collectpoint.japanese_place_name_detail,
            'coordinate_precision': collectpoint.coordinate_precision,
            'location': {"latitude": collectpoint.location.y, "longitude": collectpoint.location.x},
            'minimum_elevation': collectpoint.minimum_elevation,
            'maximam_elevation': collectpoint.maximum_elevation,
            'minimum_depth': collectpoint.minimum_depth,
            'maximum_depth': collectpoint.maximum_depth,
            'note': collectpoint.note,
            'longitude': collectpoint.longitude,
            'latitude': collectpoint.latitude
        }
        create_response = api_client().post(
            self.endpoint,
            data=expected_json,
            format='json',
            HTTP_AUTHORIZATION=f"Bearer {self.auth_token}"
        )
        create_response_dict = json.loads(create_response.content)
        url = f"{self.endpoint}{create_response_dict['id']}/"
        response = api_client().get(
            url, HTTP_AUTHORIZATION=f"Bearer {self.auth_token}")
        assert response.status_code == 200
        assert json.loads(response.content) == create_response_dict

    def test_update(self, rf, api_client):
        old_collectpoint = baker.make(CollectPoint, make_m2m=True, _fill_optional=True, country='JP')
        new_collectpoint = baker.make(CollectPoint, make_m2m=True, _fill_optional=True, country='JP')
        collectpoint_dict = {
            'tour': [],
            'contient': new_collectpoint.contient,
            'island_group': new_collectpoint.island_group,
            'island': new_collectpoint.island,
            'country': new_collectpoint.country.code,
            'state_provice': new_collectpoint.state_provice,
            'county': new_collectpoint.county,
            'municipality': new_collectpoint.municipality,
            'verbatim_locality': new_collectpoint.verbatim_locality,
            'japanese_place_name': new_collectpoint.japanese_place_name,
            'japanese_place_name_detailL': new_collectpoint.japanese_place_name_detail,
            'coordinate_precision': new_collectpoint.coordinate_precision,
            'location': {"latitude": new_collectpoint.location.y, "longitude": new_collectpoint.location.x},
            'minimum_elevation': new_collectpoint.minimum_elevation,
            'maximam_elevation': new_collectpoint.maximum_elevation,
            'minimum_depth': new_collectpoint.minimum_depth,
            'maximum_depth': new_collectpoint.maximum_depth,
            'note': new_collectpoint.note,
            'longitude': new_collectpoint.longitude,
            'latitude': new_collectpoint.latitude
        }
        create_response = api_client().post(
            self.endpoint,
            data=collectpoint_dict,
            format='json',
            HTTP_AUTHORIZATION=f"Bearer {self.auth_token}"
        )
        create_response_dict = json.loads(create_response.content)
        url = f"{self.endpoint}{create_response_dict['id']}/"
        response = api_client().put(
            url,
            collectpoint_dict,
            format='json',
            HTTP_AUTHORIZATION=f"Bearer {self.auth_token}"
        )
        assert response.status_code == 200
        print(response)
        assert json.loads(response.content) == create_response_dict

    @pytest.mark.parametrize('field', [
        ('tour'),
        ('contient'),
        ('island_group'),
        ('island'),
        ('country'),
        ('state_provice'),
        ('county'),
        ('municipality'),
        ('verbatim_locality'),
        ('japanese_place_name'),
        ('japanese_place_name_detail'),
        ('coordinate_precision'),
        ('location'),
        ('minimum_elevation'),
        ('maximum_elevation'),
        ('minimum_depth'),
        ('maximum_depth'),
        ('note'),
    ])
    def test_partial_update(self, mocker, rf, field, api_client):
        collectpoint = baker.make(CollectPoint, make_m2m=True, _fill_optional=True, country='JP')
        collectpoint_dict = {
            'tour': [],
            'contient': collectpoint.contient,
            'island_group': collectpoint.island_group,
            'island': collectpoint.island,
            'country': collectpoint.country.code,
            'state_provice': collectpoint.state_provice,
            'county': collectpoint.county,
            'municipality': collectpoint.municipality,
            'verbatim_locality': collectpoint.verbatim_locality,
            'japanese_place_name': collectpoint.japanese_place_name,
            'japanese_place_name_detail': collectpoint.japanese_place_name_detail,
            'coordinate_precision': collectpoint.coordinate_precision,
            'location': {"latitude": collectpoint.location.y, "longitude": collectpoint.location.x},
            'minimum_elevation': collectpoint.minimum_elevation,
            'maximum_elevation': collectpoint.maximum_elevation,
            'minimum_depth': collectpoint.minimum_depth,
            'maximum_depth': collectpoint.maximum_depth,
            'note': collectpoint.note,
            'longitude': collectpoint.longitude,
            'latitude': collectpoint.latitude
        }
        valid_field = collectpoint_dict[field]
        create_response = api_client().post(
            self.endpoint,
            data=collectpoint_dict,
            format='json',
            HTTP_AUTHORIZATION=f"Bearer {self.auth_token}"
        )
        create_response_dict = json.loads(create_response.content)
        url = f"{self.endpoint}{create_response_dict['id']}/"
        response = api_client().patch(
            url,
            {field: valid_field},
            format='json',
            HTTP_AUTHORIZATION=f"Bearer {self.auth_token}"
        )
        assert response.status_code == 200
        assert json.loads(response.content)[field] == valid_field

    def test_delete(self, mocker, api_client):
        collectpoint = baker.prepare(CollectPoint, country='JP')
        expected_json = {
            'tour': [],
            'contient': collectpoint.contient,
            'island_group': collectpoint.island_group,
            'island': collectpoint.island,
            'country': collectpoint.country.code,
            'state_provice': collectpoint.state_provice,
            'county': collectpoint.county,
            'municipality': collectpoint.municipality,
            'verbatim_locality': collectpoint.verbatim_locality,
            'japanese_place_name': collectpoint.japanese_place_name,
            'japanese_place_name_detailL': collectpoint.japanese_place_name_detail,
            'coordinate_precision': collectpoint.coordinate_precision,
            'location': {"latitude": collectpoint.location.y, "longitude": collectpoint.location.x},
            'minimum_elevation': collectpoint.minimum_elevation,
            'maximam_elevation': collectpoint.maximum_elevation,
            'minimum_depth': collectpoint.minimum_depth,
            'maximum_depth': collectpoint.maximum_depth,
            'note': collectpoint.note,
            'longitude': collectpoint.longitude,
            'latitude': collectpoint.latitude
        }
        create_response = api_client().post(
            self.endpoint,
            data=expected_json,
            format='json',
            HTTP_AUTHORIZATION=f"Bearer {self.auth_token}"
        )
        create_response_dict = json.loads(create_response.content)
        print(create_response_dict)
        url = f"{self.endpoint}{create_response_dict['id']}/"
        response = api_client().delete(
            url, HTTP_AUTHORIZATION=f"Bearer {self.auth_token}")
        assert response.status_code == 204
        assert CollectPoint.objects.all().count() == 0
