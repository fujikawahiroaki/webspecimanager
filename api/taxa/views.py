from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import Taxon
from .serializers import TaxonSerializer


class TaxonViewSet(viewsets.ModelViewSet):
    """
    Retrieve a list with all Taxon model instances only to the user is
    authenticated.
    """
    serializer_class = TaxonSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Get Taxons for the authenticated User.
        This view should return a list of all the Taxons for the currently
        authenticated user.
        """
        user = self.request.user

        return Taxon.objects.filter(user=user)

    # When a Taxon is created on this endpoint, associate the user so it can
    # be filtered later
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
