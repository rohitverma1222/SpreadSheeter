from django import forms
from .models import User_files

class Add_File(forms.ModelForm):
	class Meta:
		model=User_files
		fields=['File_title','User_file']