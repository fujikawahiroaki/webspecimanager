from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import Specimen
from .serializers import SpecimenSerializer


class SpecimenViewSet(viewsets.ModelViewSet):
    """
    Retrieve a list with all Specimen model instances only to the user is
    authenticated.
    """
    serializer_class = SpecimenSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Get Specimens for the authenticated User.
        This view should return a list of all the Specimens for the currently
        authenticated user.
        """
        user = self.request.user

        return Specimen.objects.filter(user=user)

    # When a Specimen is created on this endpoint, associate the user so it can
    # be filtered later
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
