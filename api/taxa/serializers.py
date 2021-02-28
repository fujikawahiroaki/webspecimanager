from rest_framework import serializers
from django.core.validators import RegexValidator
from drf_extra_fields.fields import Base64ImageField
from .models import CustomTaxon, DefaultTaxon, Taxon


class DefaultTaxonSerializer(serializers.ModelSerializer):
    """デフォルト分類モデル用シリアライザ"""
    name_publishedin_year = serializers.IntegerField(required=False)
    scientific_name = serializers.CharField(read_only=True)
    image1 = Base64ImageField(required=False)
    image2 = Base64ImageField(required=False)
    image3 = Base64ImageField(required=False)
    image4 = Base64ImageField(required=False)
    image5 = Base64ImageField(required=False)

    class Meta:
        model = DefaultTaxon
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
        extra_kwargs = {
            'kingdom': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'phylum': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'class_name': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'order': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'suborder': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'family': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'subfamily': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'tribe': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'subtribe': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'genus': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'subgenus': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'species': {
                'validators': [RegexValidator(r'^[a-z-]+$',
                                              message='小文字の半角英字1単語のみ使用可')]
            },
            'subspecies': {
                'validators': [RegexValidator(r'^[a-z-]+$',
                                              message='小文字の半角英字1単語のみ使用可')]
            },
        }


class CustomTaxonSerializer(serializers.ModelSerializer):
    """カスタム分類モデル用シリアライザ"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    name_publishedin_year = serializers.IntegerField(required=False)
    scientific_name = serializers.CharField(read_only=True)
    image1 = Base64ImageField(required=False)
    image2 = Base64ImageField(required=False)
    image3 = Base64ImageField(required=False)
    image4 = Base64ImageField(required=False)
    image5 = Base64ImageField(required=False)

    class Meta:
        model = CustomTaxon
        fields = '__all__'
        read_only_fields = ('created_at', 'id', 'user')
        extra_kwargs = {
            'kingdom': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'phylum': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'class_name': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'order': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'suborder': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'family': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'subfamily': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'tribe': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'subtribe': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'genus': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'subgenus': {
                'validators': [RegexValidator(r'^[A-Z][a-z]+$',
                                              message='先頭のみ大文字、以降小文字の半角英字1単語のみ使用可')]
            },
            'species': {
                'validators': [RegexValidator(r'^[a-z]+$',
                                              message='小文字の半角英字1単語のみ使用可')]
            },
            'subspecies': {
                'validators': [RegexValidator(r'^[a-z]+$',
                                              message='小文字の半角英字1単語のみ使用可')]
            },
        }
