from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import Tour
from .serializers import TourSerializer


class TourViewSet(viewsets.ModelViewSet):
    """
    Retrieve a list with all Tour model instances only to the user is
    authenticated.
    """
    serializer_class = TourSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Get Tours for the authenticated User.
        This view should return a list of all the Tours for the currently
        authenticated user.
        """
        user = self.request.user

        return Tour.objects.filter(user=user)

    # When a Tour is created on this endpoint, associate the user so it can
    # be filtered later
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
