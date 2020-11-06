from django.db import models
from django.conf import settings


class UesrProfile(models.Model):
    """ユーザープロファイル"""
    class Meta:
        db_table = 'user_profiles'
        ordering = ['-created_at']

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    # ソート用に更新日時を利用
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='user_profiles',
        null=True,
        on_delete=models.CASCADE
    )
