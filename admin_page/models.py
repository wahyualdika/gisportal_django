import os
from django.db import models
from django.apps import apps
from front_page.models import Berita,Peta
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver

@receiver(models.signals.post_delete, sender=Peta)
def auto_delete_peta_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `Peta` object is deleted.
    """
    if instance.path:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)

@receiver(models.signals.post_delete, sender=Berita)
def auto_delete_Berita_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `Berita` object is deleted.
    """
    if instance.path:
        if os.path.isfile(instance.path.path):
            os.remove(instance.path.path)

# @receiver(models.signals.pre_save, sender=MediaFile)
# def auto_delete_file_on_change(sender, instance, **kwargs):
#     """
#     Deletes old file from filesystem
#     when corresponding `MediaFile` object is updated
#     with new file.
#     """
#     if not instance.pk:
#         return False
#
#     try:
#         old_file = MediaFile.objects.get(pk=instance.pk).file
#     except MediaFile.DoesNotExist:
#         return False
#
#     new_file = instance.file
#     if not old_file == new_file:
#         if os.path.isfile(old_file.path):
#             os.remove(old_file.path)
