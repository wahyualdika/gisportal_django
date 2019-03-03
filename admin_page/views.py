from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic.edit import (
    CreateView,
    UpdateView,
    DeleteView,
    FormView
)
from django.views.generic import ListView
from django.views.generic.detail import DetailView
from .models import Berita, Peta
from django.shortcuts import render,redirect
from django.core.paginator import (
    Paginator,
    PageNotAnInteger,
    EmptyPage
)
from .form import BeritaForm,PetaForm
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
# Create your views here.


decorators = [login_required]

@login_required
def index(request):
    return render(request,'admin_page/welcome.html')

@login_required
def berita_form(request):
    if request.method == "POST":
        form = BeritaForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.save()
            return render(request, 'admin_page/berita_input_form.html', {'form': form})
        else:
            form = BeritaForm()
            return render(request, 'admin_page/berita_input_form.html', {'form': form})
    else:
        form = BeritaForm()
        return render(request, 'admin_page/berita_input_form.html', {'form': form})
        #return render(request,'admin_page/welcome.html')

@login_required
def berita_fedit(request,pk):
    berita = get_object_or_404(Berita, pk=pk)
    berita.path.delete()
    if request.method == "POST":
        form = BeritaForm(request.POST, request.FILES, instance=berita)
        if form.is_valid():
            post = form.save(commit=False)
            post.save()
            return render(request,'admin_page/welcome.html')
        else:
            return render(request, 'admin_page/berita_input_form.html', {'form': form})
    else:
        form = BeritaForm(instance=berita)
        return render(request, 'admin_page/berita_input_form.html', {'form': form})
        #return render(request,'admin_page/welcome.html')

@method_decorator(decorators, name='dispatch')
class BeritaList(ListView):
    #context_object_name = 'allBerita'
    template_name = 'admin_page/berita_list.html'
    paginate_by = 3
    def get_context_data(self, **kwargs):
        model = Berita.objects.order_by('-tanggal')
        context = super(BeritaList, self).get_context_data(**kwargs)
        paginator = Paginator(model, self.paginate_by)
        page = self.request.GET.get('page')
        try:
            allBerita = paginator.page(page)
        except PageNotAnInteger:
            allBerita = paginator.page(1)
        except EmptyPage:
            allBerita = paginator.page(paginator.num_pages)
        context['allBerita'] = allBerita
        return context

@method_decorator(decorators, name='dispatch')
class BeritaDetail(DetailView):
    model = Berita
    context_object_name = 'berita'
    template_name = 'admin_page/detail_berita.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

@method_decorator(decorators, name='dispatch')
class BeritaDelete(DeleteView):
    model = Berita
    template_name = 'admin_page/berita_confirm_delete.html'
    success_url = reverse_lazy('admin_page:admin_berita')
    context_object_name = 'berita'


#Using non-class based method for list of news
# @login_required
# def berita(request):
#     allBerita = Berita.objects.order_by('-tanggal')
#     context = {
#         'allBerita' : allBerita,
#     }
#     return render(request,'admin_page/berita_list.html',context)

#Peta Views Section
@method_decorator(decorators, name='dispatch')
class PetaList(ListView):
    #context_object_name = 'allBerita'
    template_name = 'admin_page/peta_list.html'
    paginate_by = 3
    def get_context_data(self, **kwargs):
        model = Peta.objects.order_by('-tanggal')
        context = super(PetaList, self).get_context_data(**kwargs)
        paginator = Paginator(model, self.paginate_by)
        page = self.request.GET.get('page')
        try:
            allPeta = paginator.page(page)
        except PageNotAnInteger:
            allPeta = paginator.page(1)
        except EmptyPage:
            allPeta = paginator.page(paginator.num_pages)
        context['allPeta'] = allPeta
        return context

@method_decorator(decorators, name='dispatch')
class PetaDetail(DetailView):
    model = Peta
    context_object_name = 'peta'
    template_name = 'admin_page/detail_peta.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

@method_decorator(decorators, name='dispatch')
class PetaDelete(DeleteView):
    model = Peta
    template_name = 'admin_page/peta_confirm_delete.html'
    success_url = reverse_lazy('admin_page:admin_peta')
    context_object_name = 'peta'

@method_decorator(decorators, name='dispatch')
class PetaCreate(CreateView):
    template_name = 'admin_page/peta_form.html'
    model = Peta
    form_class = PetaForm

@method_decorator(decorators, name='dispatch')
class PetaUpdate(UpdateView):
    template_name = 'admin_page/peta_form.html'
    model = Peta
    form_class = PetaForm

def ganti_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(request, 'Your password was successfully updated!')
            return redirect('berita/')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'registration/change_password.html', {
        'form': form
    })
