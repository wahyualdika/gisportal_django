from django.shortcuts import render
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView
from django.views.generic.detail import DetailView
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.http import Http404
from django.template import loader
from .models import Berita, Peta
from django.shortcuts import render,redirect
from django.core.paginator import Paginator

# Create your views here.

def index(request):

    allNews= Berita.objects.order_by('-tanggal')[:5]
    context = {
        'allNews' : allNews,
    }
    return render(request,'front_page/welcome.html',context)

class DetailBerita(DetailView):
    context_object_name = 'news'
    queryset = Berita.objects.all()
    template_name = 'front_page/berita_detail.html'

class RecentNewsList(ListView):
    queryset = Berita.objects.order_by('-tanggal')[:5]
    context_object_name = 'allNews'
    template_name = 'front_page/recent_news.html'

class RecentPetaList(ListView):
    queryset = Peta.objects.order_by('-tanggal')[:5]
    context_object_name = 'allPeta'
    template_name = 'front_page/peta_recent.html'

def allPetaList(request):
    queryset = Peta.objects.order_by('-tanggal')
    paginator = Paginator(queryset, 3)
    page = request.GET.get('page')
    allPeta = paginator.get_page(page)
    return render(request, 'front_page/all_peta.html', {'allPeta': allPeta})
