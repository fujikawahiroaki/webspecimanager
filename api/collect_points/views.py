from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import CollectPoint
from .serializers import CollectPointSerializer


class CollectPointViewSet(viewsets.ModelViewSet):
    """
    Retrieve a list with all CollectPoint model instances only to the user is
    authenticated.
    """
    serializer_class = CollectPointSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Get CollectPoints for the authenticated User.
        This view should return a list of all the CollectPoints for the currently
        authenticated user.
        """
        user = self.request.user

        return CollectPoint.objects.filter(user=user)

    # When a CollectPoint is created on this endpoint, associate the user so it can
    # be filtered later
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
