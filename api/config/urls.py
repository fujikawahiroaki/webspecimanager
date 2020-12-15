from django.contrib.gis import admin
from django.urls import path
from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from rest_framework.documentation import include_docs_urls
# from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user-profiles/', include('users.urls')),
    path('api/specimens/', include('specimens.urls')),
    path('api/collect-points/', include('collect_points.urls')),
    path('api/taxa/', include('taxa.urls')),
    path('api/tours/', include('tours.urls')),
    path('api/label-maker/', include('label_maker.urls')),
    path('api/collection-settings', include('collection_settings.urls')),
]

# 開発中のメディアファイル配信設定
urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns += [path('docs/', include_docs_urls(title='APIドキュメント'))]
