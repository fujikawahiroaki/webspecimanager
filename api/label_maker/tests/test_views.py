from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from factories.factories import SpecimenLabelFactory


class TestSpecimenLabelView(APITestCase):
    """SpecimenLabelViewのテストクラス"""
    TARGET_URL_WITH_PK = '/api/label-maker/own-labels/{}/make-pdf'

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user = get_user_model().objects.create_user(
            username='user',
            email='user@example.com',
            password='unkonuh43093i;e',
        )

    def test_make_label(self):
        """ラベル生成テスト"""
        self.client.force_login(user=self.user)
        self.splabel = SpecimenLabelFactory.create()
        self.splabel.save()
        response = self.client.put(
            self.TARGET_URL_WITH_PK.format(self.splabel.id),
            format='json'
        )
        self.assertEqual(response.status_code, 200)
