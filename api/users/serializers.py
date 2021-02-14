from rest_framework import serializers
from django.core.validators import RegexValidator
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """ユーザープロファイルモデル用シリアライザ"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ('created_at', 'id')
        extra_kwargs = {
            'contient': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'island_group': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'island': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
            'state_provice': {
                'validators': [RegexValidator(r'^[!-~ ]+$',
                                              message='半角英数記号のみ使用可')]
            },
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
