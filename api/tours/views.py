from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import Tour
from .serializers import TourSerializer


class TourViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有する採集行情報取得ビュー
    """
    serializer_class = TourSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tour.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
