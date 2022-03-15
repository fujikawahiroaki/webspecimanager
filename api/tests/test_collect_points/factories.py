from model_bakery import baker
from api.collect_points.models import CollectPoint

baker.prepare(CollectPoint)
baker.prepare(CollectPoint, _quantity=3)
