from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import CustomTaxon, DefaultTaxon
from .serializers import CustomTaxonSerializer, DefaultTaxonSerializer


class DefaultTaxonViewset(viewsets.ModelViewSet):
    """
    デフォルト分類情報モデル用ビュー(全ユーザー共有)
    """
    queryset = DefaultTaxon.objects.all()
    serializer_class = DefaultTaxonSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]


class CustomTaxonViewSet(viewsets.ModelViewSet):
    """
    認証されたユーザーが所有するカスタム分類情報取得ビュー
    """
    serializer_class = CustomTaxonSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CustomTaxon.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
