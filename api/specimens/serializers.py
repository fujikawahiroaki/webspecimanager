from rest_framework import serializers
from django.core.validators import RegexValidator
from drf_writable_nested import WritableNestedModelSerializer
from django_countries.serializer_fields import CountryField
from django_countries.serializers import CountryFieldMixin
from .models import Specimen
from collect_points.serializers import CollectPointSerializer
from taxa.serializers import CustomTaxonSerializer
from collection_settings.serializers import CollectionSettingSerializer


class SpecimenSerializer(CountryFieldMixin, WritableNestedModelSerializer):
    """標本情報モデル用シリアライザ"""
    collect_point_info = CollectPointSerializer(required=False)
    custom_taxon_info = CustomTaxonSerializer(required=False)
    collection_settings_info = CollectionSettingSerializer(required=False)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    collection_name = serializers.ReadOnlyField(
        source='collection_settings_info.collection_name')
    institution_code = serializers.ReadOnlyField(
        source='collection_settings_info.institution_code')
    collection_code = serializers.IntegerField(required=False)
    date_identified = serializers.DateField(required=False)
    year = serializers.IntegerField(required=False)
    month = serializers.IntegerField(required=False)
    day = serializers.IntegerField(required=False)

    class Meta:
        model = Specimen
        fields = '__all__'
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

    def get_genus(self, instance):
        if instance.custom_taxon_info is None and \
           instance.default_taxon_info is not None:
            return instance.default_taxon_info.genus
        elif instance.custom_taxon_info is not None:
            return instance.custom_taxon_info.genus
        else:
            return ''

    def get_species(self, instance):
        if instance.custom_taxon_info is None and \
           instance.default_taxon_info is not None:
            return instance.default_taxon_info.species
        elif instance.custom_taxon_info is not None:
            return instance.custom_taxon_info.species
        else:
            return ''

    def get_subspecies(self, instance):
        if instance.custom_taxon_info is None and \
           instance.default_taxon_info is not None:
            return instance.default_taxon_info.subspecies
        elif instance.custom_taxon_info is not None:
            return instance.custom_taxon_info.subspecies
        else:
            return ''

    def get_scientific_name_author(self, instance):
        if instance.custom_taxon_info is None and \
           instance.default_taxon_info is not None:
            return instance.default_taxon_info.scientific_name_author
        elif instance.custom_taxon_info is not None:
            return instance.custom_taxon_info.scientific_name_author
        else:
            return ''

    def get_name_publishedin_year(self, instance):
        if instance.custom_taxon_info is None and \
           instance.default_taxon_info is not None:
            return instance.default_taxon_info.name_publishedin_year
        elif instance.custom_taxon_info is not None:
            return instance.custom_taxon_info.name_publishedin_year
        else:
            return ''

    def get_japanese_name(self, instance):
        if instance.custom_taxon_info is None and \
           instance.default_taxon_info is not None:
            return instance.default_taxon_info.japanese_name
        elif instance.custom_taxon_info is not None:
            return instance.custom_taxon_info.japanese_name
        else:
            return ''

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
