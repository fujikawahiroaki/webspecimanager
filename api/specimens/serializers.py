from rest_framework import serializers
from django.core.validators import RegexValidator
from drf_writable_nested import WritableNestedModelSerializer
from django_countries.serializer_fields import CountryField
from django_countries.serializers import CountryFieldMixin
from .models import Specimen
from collect_points.serializers import CollectPointSerializer
from taxa.serializers import CustomTaxonSerializer, DefaultTaxonSerializer
from collection_settings.serializers import CollectionSettingSerializer
from tours.serializers import TourSerializer


class SpecimenSerializer(CountryFieldMixin, WritableNestedModelSerializer):
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

    def get_collection_name(self, instance):
        if instance.collection_settings_info is not None:
            return instance.collection_settings_info.collection_name
        else:
            return ''

    def get_institution_code(self, instance):
        if instance.collection_settings_info is not None:
            return instance.collection_settings_info.institution_code
        else:
            return 0

    collect_point_info = CollectPointSerializer(required=False)
    custom_taxon_info = CustomTaxonSerializer(required=False)
    collection_settings_info = CollectionSettingSerializer(required=False)
    tour = TourSerializer(required=False)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    genus = serializers.SerializerMethodField()
    species = serializers.SerializerMethodField()
    subspecies = serializers.SerializerMethodField()
    scientific_name_author = serializers.SerializerMethodField()
    name_publishedin_year = serializers.SerializerMethodField()
    japanese_name = serializers.SerializerMethodField()
    collection_name = serializers.SerializerMethodField()
    institution_code = serializers.SerializerMethodField()
    country = CountryField(source='collect_point_info.country')
    island = serializers.ReadOnlyField(source='collect_point_info.island')
    state_provice = serializers.ReadOnlyField(
        source='collect_point_info.state_provice')
    county = serializers.ReadOnlyField(source='collect_point_info.county')
    municipality = serializers.ReadOnlyField(
        source='collect_point_info.municipality')
    japanese_place_name = serializers.ReadOnlyField(
        source='collect_point_info.japanese_place_name')
    longitude = serializers.ReadOnlyField(source='collect_point_info.longitude')
    latitude = serializers.ReadOnlyField(source='collect_point_info.latitude')
    maximum_elevation = serializers.ReadOnlyField(
        source='collect_point_info.maximum_elevation')
    collection_code = serializers.IntegerField(required=False)
    date_identified = serializers.DateField(required=False)
    year = serializers.IntegerField(required=False)
    month = serializers.IntegerField(required=False)
    day = serializers.IntegerField(required=False)

    class Meta:
        model = Specimen
        fields = ['id', 'date_last_modified', 'user',
                  'custom_taxon_info', 'collect_point_info', 'tour',
                  'collection_settings_info', 'genus', 'species', 'subspecies',
                  'scientific_name_author', 'name_publishedin_year',
                  'japanese_name', 'country', 'island', 'state_provice',
                  'county', 'municipality', 'japanese_place_name',
                  'longitude', 'latitude', 'maximum_elevation',
                  'collection_name', 'institution_code', 'collection_code',
                  'identified_by', 'date_identified', 'collecter',
                  'year', 'month', 'day', 'sex', 'sampling_protocol']
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
                                 WritableNestedModelSerializer):
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
            return 0

    def get_collection_name(self, instance):
        if instance.collection_settings_info is not None:
            return instance.collection_settings_info.collection_name
        else:
            return ''

    def get_institution_code(self, instance):
        if instance.collection_settings_info is not None:
            return instance.collection_settings_info.institution_code
        else:
            return 0

    genus = serializers.SerializerMethodField()
    species = serializers.SerializerMethodField()
    subspecies = serializers.SerializerMethodField()
    scientific_name_author = serializers.SerializerMethodField()
    name_publishedin_year = serializers.SerializerMethodField()
    japanese_name = serializers.SerializerMethodField()
    collection_name = serializers.SerializerMethodField()
    institution_code = serializers.SerializerMethodField()
    country = CountryField(source='collect_point_info.country')
    island = serializers.ReadOnlyField(source='collect_point_info.island')
    state_provice = serializers.ReadOnlyField(
        source='collect_point_info.state_provice')
    county = serializers.ReadOnlyField(source='collect_point_info.county')
    municipality = serializers.ReadOnlyField(
        source='collect_point_info.municipality')
    japanese_place_name = serializers.ReadOnlyField(
        source='collect_point_info.japanese_place_name')
    longitude = serializers.ReadOnlyField(source='collect_point_info.longitude')
    latitude = serializers.ReadOnlyField(source='collect_point_info.latitude')
    maximum_elevation = serializers.ReadOnlyField(
        source='collect_point_info.maximum_elevation')

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
