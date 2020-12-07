"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 3.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os
from pathlib import Path
import environ
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
PROJECT_NAME = os.path.basename(BASE_DIR)
DJANGO_READ_ENV_FILE = True
env = environ.Env()
env.read_env(os.path.join(BASE_DIR, ('.env')))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')


ALLOWED_HOSTS = env('ALLOWED_HOSTS')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 非デフォルト設定
    'django.contrib.gis',
    'django_cleanup.apps.CleanupConfig',
    # サードパーティ
    'rest_framework',
    'rest_framework_gis',
    'corsheaders',
    'rest_framework_jwt',
    'rest_framework_auth0',
    'location_field.apps.DefaultConfig',
    'django_filters',
    # 自作アプリ
    'my_utils',
    'collect_points.apps.CollectPointsConfig',
    'taxa.apps.TaxaConfig',
    'tours.apps.ToursConfig',
    'specimens.apps.SpecimensConfig',
    'users.apps.UsersConfig',
    'label_maker.apps.LabelMakerConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': env.db(),
    'TEST': {
            'NAME': 'test_database',
        },
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/


LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = '/var/www/{}/static'.format(PROJECT_NAME)

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


SITE_ID = 1
CORS_ORIGIN_WHITELIST = env.get_value('CORS_ORIGIN_WHITELIST', tuple)


# LocationField関連設定
LOCATION_FIELD = {
    'map.provider': 'google',
    'search.provider': 'google',
    'provider.google.api': '//maps.google.com/maps/api/js?sensor=false',
    'provider.google.api_key': '',
    'provider.google.api_libraries': env('GOOGLEMAP_API_KEY'),
    'provider.google.map.type': 'ROADMAP',
}


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_auth0.authentication.Auth0JSONWebTokenAuthentication',
    ),
}

certificate_dir = os.path.join(BASE_DIR, "rsa_certificates/certificate.pem")
certificate_text = open(certificate_dir, 'rb').read()
certificate = load_pem_x509_certificate(certificate_text, default_backend())
default_publickey = certificate.public_key()

AUTH0 = {
    'CLIENTS': {
        'default': {
            'AUTH0_CLIENT_ID': env('AUTH0_CLIENT_ID'),  # make sure it's the same string that aud attribute in your payload provides
            'AUTH0_CLIENT_SECRET': env('AUTH0_CLIENT_SECRET'),
            'CLIENT_SECRET_BASE64_ENCODED': True,
            'AUTH0_ALGORITHM': 'RS256',
            'AUTH0_AUDIENCE': env('AUTH0_AUDIENCE'),
            'PUBLIC_KEY': default_publickey,  # used only for RS256
        }
    },
    'JWT_AUTH_HEADER_PREFIX': 'JWT',  # default prefix used by djangorestframework_jwt
    'AUTHORIZATION_EXTENSION': False,  # default to False
}
