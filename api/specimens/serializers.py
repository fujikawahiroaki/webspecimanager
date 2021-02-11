from rest_framework import serializers
from django.core.validators import RegexValidator
from drf_writable_nested import WritableNestedModelSerializer
from django_countries.serializer_fields import CountryField
from django_countries.serializers import CountryFieldMixin
from drf_extra_fields.geo_fields import PointField
from drf_extra_fields.fields import Base64ImageField
from .models import Specimen
from collect_points.serializers import CollectPointSerializer
from taxa.serializers import CustomTaxonSerializer, DefaultTaxonSerializer
from collection_settings.serializers import CollectionSettingSerializer
from tours.serializers import TourSerializer


class SpecimenSerializer(CountryFieldMixin, serializers.ModelSerializer):
    """標本情報モデル用シリアライザ"""

    def make_taxon_field(self, instance, field_name):
        if instance.custom_taxon_info is None and \
           instance.default_taxon_info is not None:
            return getattr(instance.default_taxon_info, field_name)
        elif instance.custom_taxon_info is not None:
            return getattr(instance.custom_taxon_info, field_name)
        else:
            return ''

    def get_kingdom(self, instance):
        return self.make_taxon_field(instance, "kingdom")

    def get_phylum(self, instance):
        return self.make_taxon_field(instance, "phylum")

    def get_class_name(self, instance):
        return self.make_taxon_field(instance, "class_name")

    def get_order(self, instance):
        return self.make_taxon_field(instance, "order")

    def get_suborder(self, instance):
        return self.make_taxon_field(instance, "suborder")

    def get_family(self, instance):
        return self.make_taxon_field(instance, "family")

    def get_subfamily(self, instance):
        return self.make_taxon_field(instance, "subfamily")

    def get_tribe(self, instance):
        return self.make_taxon_field(instance, "tribe")

    def get_subtribe(self, instance):
        return self.make_taxon_field(instance, "subtribe")

    def get_genus(self, instance):
        return self.make_taxon_field(instance, "genus")

    def get_subgenus(self, instance):
        return self.make_taxon_field(instance, "subgenus")

    def get_species(self, instance):
        return self.make_taxon_field(instance, "species")

    def get_subspecies(self, instance):
        return self.make_taxon_field(instance, "subspecies")

    def get_scientific_name_author(self, instance):
        return self.make_taxon_field(instance, "scientific_name_author")

    def get_name_publishedin_year(self, instance):
        return self.make_taxon_field(instance, "name_publishedin_year")

    def get_japanese_name(self, instance):
        return self.make_taxon_field(instance, "japanese_name")
    # 外部キー`
    # collect_point_info = CollectPointSerializer(required=False)
    # custom_taxon_info = CustomTaxonSerializer(required=False)
    # default_taxon_info = DefaultTaxonSerializer(required=False, read_only=True)
    # collection_settings_info = CollectionSettingSerializer(required=False)
    # tour = TourSerializer(required=False)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    # 分類情報
    kingdom = serializers.SerializerMethodField()
    phylum = serializers.SerializerMethodField()
    class_name = serializers.SerializerMethodField()
    order = serializers.SerializerMethodField()
    suborder = serializers.SerializerMethodField()
    family = serializers.SerializerMethodField()
    subfamily = serializers.SerializerMethodField()
    tribe = serializers.SerializerMethodField()
    subtribe = serializers.SerializerMethodField()
    genus = serializers.SerializerMethodField()
    subgenus = serializers.SerializerMethodField()
    species = serializers.SerializerMethodField()
    subspecies = serializers.SerializerMethodField()
    scientific_name_author = serializers.SerializerMethodField()
    name_publishedin_year = serializers.SerializerMethodField()
    japanese_name = serializers.SerializerMethodField()
    # コレクション設定
    collection_name = serializers.ReadOnlyField(
        source='collection_settings_info.collection_name')
    institution_code = serializers.ReadOnlyField(
        source='collection_settings_info.institution_code')
    latest_collection_code = serializers.ReadOnlyField(
        source='collection_settings_info.latest_collection_code')
    # 採集地点
    contient = serializers.ReadOnlyField(source='collect_point_info.contient')
    island_group = serializers.ReadOnlyField(
        source='collect_point_info.island_group')
    country = CountryField(source='collect_point_info.country', required=False)
    island = serializers.ReadOnlyField(source='collect_point_info.island')
    state_provice = serializers.ReadOnlyField(
        source='collect_point_info.state_provice')
    county = serializers.ReadOnlyField(source='collect_point_info.county')
    municipality = serializers.ReadOnlyField(
        source='collect_point_info.municipality')
    japanese_place_name = serializers.ReadOnlyField(
        source='collect_point_info.japanese_place_name')
    japanese_place_name_detail = serializers.ReadOnlyField(
        source='collect_point_info.japanese_place_name_detail')
    coordinate_precision = serializers.ReadOnlyField(
        source='collect_point_info.coodinate_precision')
    location = PointField(source='collect_point_info.location', required=False)
    longitude = serializers.ReadOnlyField(
        source='collect_point_info.longitude')
    latitude = serializers.ReadOnlyField(
        source='collect_point_info.latitude')
    minimum_elevation = serializers.ReadOnlyField(
        source='collect_point_info.minimum_eleavation')
    maximum_elevation = serializers.ReadOnlyField(
        source='collect_point_info.maximum_elevation')
    minimum_depth = serializers.ReadOnlyField(
        source='collect_point_info.minimum_depth')
    maximum_depth = serializers.ReadOnlyField(
        source='collect_point_info.maximum_depth')
    # 採集行
    title = serializers.ReadOnlyField(source='tour.title')
    # モデル固有フィールド
    collection_code = serializers.IntegerField(required=False)
    date_identified = serializers.DateField(required=False)
    year = serializers.IntegerField(required=False)
    month = serializers.IntegerField(required=False)
    day = serializers.IntegerField(required=False)
    image1 = Base64ImageField(required=False)
    image2 = Base64ImageField(required=False)
    image3 = Base64ImageField(required=False)
    image4 = Base64ImageField(required=False)
    image5 = Base64ImageField(required=False)
    name = serializers.CharField(read_only=True)

    class Meta:
        model = Specimen
        fields = ['id', 'date_last_modified', 'user', 'default_taxon_info',
                  'custom_taxon_info', 'collect_point_info', 'tour',
                  'collection_settings_info', 'kingdom', 'phylum',
                  'class_name', 'order', 'suborder', 'family',
                  'subfamily', 'tribe', 'subtribe',
                  'genus', 'subgenus', 'species', 'subspecies',
                  'scientific_name_author', 'name_publishedin_year',
                  'japanese_name', 'contient', 'island_group',
                  'country', 'island', 'state_provice',
                  'county', 'municipality',
                  'japanese_place_name', 'japanese_place_name_detail',
                  'coordinate_precision', 'location',
                  'longitude', 'latitude', 'minimum_elevation',
                  'maximum_elevation', 'minimum_depth', 'maximum_depth',
                  'collection_name', 'institution_code',
                  'latest_collection_code', 'title', 'collection_code',
                  'identified_by', 'date_identified', 'collecter',
                  'year', 'month', 'day', 'sex', 'sampling_protocol',
                  'lifestage', 'rights', 'image1', 'image2', 'image3',
                  'image4', 'image5', 'name']
        read_only_fields = ('date_last_modified', 'id')
        extra_kwargs = {
            'identified_by': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'collecter': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'preparation_type': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'disposition': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'sampling_protocol': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'sampling_effort': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'lifestage': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'establishment_means': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'rights': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
        }


class SpecimenForLabelSerializer(CountryFieldMixin,
                                 serializers.ModelSerializer):
    """標本情報モデルのラベル用シリアライザ"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def make_taxon_field(self, instance, field_name):
        if instance.custom_taxon_info is None and \
           instance.default_taxon_info is not None:
            return getattr(instance.default_taxon_info, field_name)
        elif instance.custom_taxon_info is not None:
            return getattr(instance.custom_taxon_info, field_name)
        else:
            return ''
    
    def make_collect_point_field(self, instance, field_name):
        if instance.collect_point_info is None:
            return ''
        else:
            return str(getattr(instance.collect_point_info, field_name))

    def get_genus(self, instance):
        return self.make_taxon_field(instance, "genus")

    def get_species(self, instance):
        return self.make_taxon_field(instance, "species")

    def get_subspecies(self, instance):
        return self.make_taxon_field(instance, "subspecies")

    def get_scientific_name_author(self, instance):
        return self.make_taxon_field(instance, "scientific_name_author")

    def get_name_publishedin_year(self, instance):
        return self.make_taxon_field(instance, "name_publishedin_year")

    def get_japanese_name(self, instance):
        return self.make_taxon_field(instance, "japanese_name")

    def get_collection_name(self, instance):
        if instance.collection_settings_info is not None:
            return instance.collection_settings_info.collection_name
        else:
            return ''

    def get_institution_code(self, instance):
        if instance.collection_settings_info is not None:
            return instance.collection_settings_info.institution_code
        else:
            return ''

    def get_country(self, instance):
        return self.make_collect_point_field(instance, 'country')

    def get_island(self, instance):
        return self.make_collect_point_field(instance, 'island')

    def get_state_provice(self, instance):
        return self.make_collect_point_field(instance, 'state_provice')

    def get_county(self, instance):
        return self.make_collect_point_field(instance, 'county')

    def get_municipality(self, instance):
        return self.make_collect_point_field(instance, 'municipality')

    def get_japanese_place_name(self, instance):
        return self.make_collect_point_field(instance, 'japanese_place_name')

    def get_longitude(self, instance):
        return self.make_collect_point_field(instance, 'longitude')

    def get_latitude(self, instance):
        return self.make_collect_point_field(instance, 'latitude')

    def get_maximum_elevation(self, instance):
        return self.make_collect_point_field(instance, 'maximum_elevation')

    genus = serializers.SerializerMethodField()
    species = serializers.SerializerMethodField()
    subspecies = serializers.SerializerMethodField()
    scientific_name_author = serializers.SerializerMethodField()
    name_publishedin_year = serializers.SerializerMethodField()
    japanese_name = serializers.SerializerMethodField()
    collection_name = serializers.SerializerMethodField()
    institution_code = serializers.SerializerMethodField()
    country = serializers.SerializerMethodField()
    island = serializers.SerializerMethodField()
    state_provice = serializers.SerializerMethodField()
    county = serializers.SerializerMethodField()
    municipality = serializers.SerializerMethodField()
    japanese_place_name = serializers.SerializerMethodField()
    longitude = serializers.SerializerMethodField()
    latitude = serializers.SerializerMethodField()
    maximum_elevation = serializers.SerializerMethodField()

    class Meta:
        model = Specimen
        fields = ['id', 'date_last_modified', 'user',
                  'genus', 'species', 'subspecies',
                  'scientific_name_author', 'name_publishedin_year',
                  'japanese_name', 'country', 'island', 'state_provice',
                  'county', 'municipality', 'japanese_place_name',
                  'longitude', 'latitude', 'maximum_elevation',
                  'collection_name', 'institution_code', 'collection_code',
                  'identified_by', 'date_identified', 'collecter',
                  'year', 'month', 'day', 'sex', 'sampling_protocol']
        read_only_fields = ('date_last_modified', 'id')
