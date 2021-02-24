from rest_framework.response import Response
from rest_framework import status


def multi_create(serializer_class=None):
    def __multi_create(function):
        def __wrapper(self, request, *args, **kwargs):
            many = False
            if isinstance(request.data, list):
                many = True
            serializer = serializer_class(data=request.data, many=many)
            if serializer.is_valid():
                serializer.save()
                headers = self.get_success_headers(serializer.data)
                data = serializer.data
                result = function(self, request, *args, **kwargs)
                if result is not None:
                    return result
                if many:
                    data = list(data)
                return Response(data,
                                status=status.HTTP_201_CREATED,
                                headers=headers)
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)
        return __wrapper
    return __multi_create
