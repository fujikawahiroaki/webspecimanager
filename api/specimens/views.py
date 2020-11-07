from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import Specimen
from .serializers import SpecimenSerializer


class SpecimenViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有する標本情報取得ビュー
    """
    serializer_class = SpecimenSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Specimen.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
