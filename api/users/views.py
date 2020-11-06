from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_auth0.authentication import Auth0JSONWebTokenAuthentication
from .models import UesrProfile
from .serializers import UserProfileSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    Retrieve a list with all UserProfile model instances only to the user is
    authenticated.
    """
    serializer_class = UserProfileSerializer
    authentication_classes = [Auth0JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Get UserProfiles for the authenticated User.
        This view should return a list of all the UserProfiles for the currently
        authenticated user.
        """
        user = self.request.user

        return UesrProfile.objects.filter(user=user)

    # When a UserProfile is created on this endpoint, associate the user so it can
    # be filtered later
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
