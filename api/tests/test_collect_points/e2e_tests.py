from urllib import response
from model_bakery import baker
import factory
import json
import pytest

from collect_points.models import CollectPoint

pytestmark = pytest.mark.django_db

class TestCollectPointEndpoints:
    endpoint = '/api/collect-points/own-collect-points'
    
    def test_list(self, api_client):
        baker.make(CollectPoint, _quantity=3)
        reponse = api_client().get(self.endpoint)
        assert response.status_code == 200
        assert len(json.loads(response.content)) == 3
    
    def test_create(self, api_client):
        collectpoint = baker.prepare(CollectPoint)
        expected_json = {
            
        }