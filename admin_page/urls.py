from django.urls import path,include
from . import views
from django.contrib.auth import authenticate, login
from .models import Berita,Peta

app_name = "admin_page"

urlpatterns = [
    path('', views.index, name='admin_index'),

    path('berita/',views.BeritaList.as_view(model=Berita),name='admin_berita'),
    path('berita/detail/<int:pk>',views.BeritaDetail.as_view(model=Berita),name='berita_detail'),
    path('berita/form/', views.berita_form, name='berita_input'),
    path('berita/<int:pk>/edit/',views.berita_fedit,name='berita_fedit'),
    path('berita/<int:pk>/delete/',views.BeritaDelete.as_view(model=Berita),name='berita_delete'),

    path('peta/',views.PetaList.as_view(model=Peta),name='admin_peta'),
    path('peta/detail/<int:pk>',views.PetaDetail.as_view(model=Peta),name='peta_detail'),
    path('peta/<int:pk>/delete/',views.PetaDelete.as_view(model=Peta),name='peta_delete'),
    path('peta/form/',views.PetaCreate.as_view(model=Peta),name='peta_input'),
    path('peta/<int:pk>/edit/',views.PetaUpdate.as_view(model=Peta),name='peta_update'),

    path('ganti_password/',views.ganti_password,name='ganti_password'),

]
