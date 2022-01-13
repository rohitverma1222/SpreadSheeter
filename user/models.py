from django.db import models
from django.contrib.auth.models import User
import datetime
# Create your models here.
class User_files(models.Model):
	File_title=models.CharField(max_length=100)
	User_file=models.TextField(blank=True)
	File_user=models.ForeignKey(User,on_delete=models.DO_NOTHING)
	updated=models.DateTimeField(auto_now=True)
	created=models.DateTimeField(auto_now_add=True)



