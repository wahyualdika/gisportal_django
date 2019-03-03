from django.db import models
from django.urls import reverse

# Create your models here.

class Berita(models.Model):
    nama = models.CharField(max_length = 50)
    tanggal =  models.DateField(editable=True)
    deskripsi = models.TextField()
    path = models.FileField(blank=True)
    link = models.CharField(max_length = 150)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def get_absolute_url(self):
        return reverse('admin_page:berita_detail',args=[str(self.id)])

    def __str__(self):
        return self.nama

class Peta(models.Model):
    nama = models.CharField(max_length = 150)
    tanggal = models.DateField(editable=True)
    deskripsi = models.TextField(editable=True)
    path = models.FileField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def get_absolute_url(self):
        return reverse('admin_page:peta_detail',args=[str(self.id)])

    def __str__(self):
        return self.nama

    def save(self, *args, **kwargs):
        if self.pk:
            peta = Peta.objects.get(pk=self.pk)
            if peta.path != self.path:
                peta.path.delete(False)
        super(Peta, self).save(*args, **kwargs)
