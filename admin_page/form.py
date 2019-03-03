from django import forms
from front_page.models import Berita,Peta

class BeritaForm(forms.ModelForm):
    class Meta:
        model = Berita
        fields = ('nama', 'deskripsi', 'tanggal', 'link', 'path')
        widgets = {
            'nama':forms.TextInput(attrs={'class':'form-control'}),
            'deskripsi': forms.Textarea(attrs={'cols': 80, 'rows': 5,'label':'Deskripsi Berita','class':'form-control',
            'id':'summernote'}),
            'tanggal': forms.DateInput(format=('%Y-%m-%d'),
                                             attrs={'class':'form-control',
                                            'placeholder':'Select a date'}),
            'path':forms.FileInput(attrs=None),
            'link':forms.TextInput(attrs={'class':'form-control'})
        }

class PetaForm(forms.ModelForm):
    class Meta:
        model = Peta
        fields = ('nama', 'deskripsi', 'tanggal', 'path')
        widgets = {
            'nama':forms.TextInput(attrs={'class':'form-control'}),
            'deskripsi': forms.Textarea(attrs={'cols': 80, 'rows': 5,'label':'Deskripsi Berita','class':'form-control',
            'id':'summernote'}),
            'tanggal': forms.DateInput(format=('%Y-%m-%d'),
                                             attrs={'class':'form-control',
                                            'placeholder':'Select a date'}),
            'path':forms.FileInput(attrs=None),
        }
