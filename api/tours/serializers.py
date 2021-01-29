from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from .models import Tour
from specimens.models import Specimen
from collect_points.models import CollectPoint
from specimens.serializers import SpecimenSerializer
from collect_points.serializers import CollectPointSerializer


class TourSerializer(serializers.ModelSerializer):
    """採集行モデル用シリアライザ"""
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    start_date = serializers.DateField(required=False)
    end_date = serializers.DateField(required=False)
    specimens = serializers.SerializerMethodField()
    collect_points = serializers.SerializerMethodField()
    image1 = Base64ImageField(required=False)
    image2 = Base64ImageField(required=False)
    image3 = Base64ImageField(required=False)
    image4 = Base64ImageField(required=False)
    image5 = Base64ImageField(required=False)

    def get_specimens(self, obj):
        specimens_data = SpecimenSerializer(Specimen.objects.all().filter(
            tour=Tour.objects.get(id=obj.id)), many=True).data
        return specimens_data

    def get_collect_points(self, obj):
        collect_points_data = CollectPointSerializer(
            CollectPoint.objects.all().filter(
                tour=Tour.objects.get(id=obj.id)), many=True).data
        return collect_points_data

    class Meta:
        model = Tour
        fields = ['id', 'created_at', 'user', 'title',
                  'start_date', 'end_date', 'track', 'note',
                  'image1', 'image2', 'image3', 'image4', 'image5',
                  'specimens', 'collect_points']
        read_only_fields = ('created_at', 'id', 'user')
