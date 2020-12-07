import factory
import datetime
from collect_points.models import CollectPoint
from taxa.models import DefaultTaxon, CustomTaxon
from tours.models import Tour
from specimens.models import Specimen
from label_maker.models import SpecimenLabel


class CollectPointFactory(factory.django.DjangoModelFactory):
    """採集地点モデルのテストデータ"""
    class Meta:
        model = CollectPoint
    id = factory.Faker('uuid4')
    created_at = datetime.datetime.now()
    island = 'Okinawa Is.'
    country = 'JP'
    state_provice = 'Okinawa-ken'
    municipality = 'Kunigami-son, Ada, Mt.Terukubi-yama'
    japanese_place_name = '国頭村 安波 照首山'
    longitude = 128.030900
    latitude = 32.309010
    maximum_elevation = 432


class DefaultTaxonFactory(factory.django.DjangoModelFactory):
    """デフォルト分類情報モデルのテストデータ"""
    class Meta:
        model = DefaultTaxon
    id = factory.Faker('uuid4')
    created_at = datetime.datetime.now()
    genus = 'Neolucanus'
    species = 'okinawanus'
    scientific_name_author = 'Sakaino'
    name_publishedin_year = 1986
    japanese_name = 'オキナワマルバネクワガタ'


class SpecimenFactory(factory.django.DjangoModelFactory):
    """標本情報モデルのテストデータ"""
    class Meta:
        model = Specimen
    id = factory.Faker('uuid4')
    date_last_modified = datetime.datetime.now()
    default_taxon_info = factory.SubFactory(DefaultTaxonFactory)
    collect_point_info = factory.SubFactory(CollectPointFactory)
    collection_name = "FUJIKAWA Hiroaki's Collection"
    institution_code = 'FHC'
    collection_code = 3
    identified_by = 'FUJIKAWA H.'
    date_identified = datetime.date.today()
    collecter = 'FUJIKAWA H.'
    year = 2015
    month = 10
    day = 18
    sex = 'M'
    sampling_protocol = 'Looking Oak Tree'


class SpecimenLabelFactory(factory.django.DjangoModelFactory):
    """標本ラベルモデルのテストデータ"""
    class Meta:
        model = SpecimenLabel
    id = factory.Faker('uuid4')
    created_at = datetime.datetime.now()
    name = 'test label'

    @factory.post_generation
    def label_specimens(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for specimen in extracted:
                self.label_specimens.add(specimen)
