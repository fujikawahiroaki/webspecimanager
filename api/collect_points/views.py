from django_filters import rest_framework as filters
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import CollectPoint
from .serializers import CollectPointSerializer


class CollectPointViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有する採集ポイント情報取得ビュー
    """
    serializer_class = CollectPointSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['contient', 'island_group', 'island',
                        'country', 'state_provice', 'county',
                        'municipality', 'verbatim_locality',
                        'japanese_place_name',
                        'longitude', 'latitude', 'coordinate_precision',
                        'minimum_elevation', 'maximum_elevation',
                        'minimum_depth', 'maximum_depth', 'note']

    def get_queryset(self):
        user = self.request.user
        return CollectPoint.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
