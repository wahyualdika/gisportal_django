from django.urls import path
from . import views


app_name = "front_page"

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:pk>/detail', views.DetailBerita.as_view(),name='detail_berita'),
    path('recent_news/', views.RecentNewsList.as_view(),name='recent_berita'),
    path('recent_peta/',views.RecentPetaList.as_view(),name='recent_peta'),
    path('all_peta/',views.allPetaList,name='all_peta'),
]
