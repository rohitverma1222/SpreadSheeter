from django.shortcuts import render,redirect
from django.http import HttpResponse
from . models import User_files
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User,auth
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def index(request):
	current_user=request.user.id

	if request.method=='POST':
		NameOfFile=request.POST['fudu']
		user_id=User.objects.get(id=current_user)	
		user_upload=User_files.objects.create(File_title=NameOfFile,User_file="",File_user=user_id)
		user_upload.save()
		# ob=User_files.objects.get(File_user=NameOfFile)
		IDs=user_upload.id
		print(IDs)
		return render(request,'index.html',{'NameOfFile':NameOfFile,'IDs':IDs})
	else:
		
		return render(request,'index.html')

def helpArticle(request):
	return render(request,'help.html')

@login_required(login_url='/account/login')
def dashBoard(request):
	queryset=User_files.objects.filter(File_user=request.user.id).order_by('-updated')
	return render(request,'dashBoard.html',{'queryset':queryset})


@login_required(login_url='/account/login')
def openFile(request,id):
	obj=User_files.objects.get(pk=id)
	data=obj.User_file
	Name=obj.File_title
	IDs=id
	return render(request,'index.html',{'data':data,'NameOfFile':Name,'IDs':IDs})


@csrf_exempt
@login_required(login_url='/account/login')
def save(request,id):

	if request.is_ajax():
		print("inside ajax")
		data=request.POST['send']

		user_obj=User_files.objects.get(pk=id)
		user_obj.User_file=data;
		user_obj.save()
		print("save")
		return JsonResponse({'data':'Saved'})
	else:
		return JsonResponse({'data':'sorry something wrong'})

@csrf_exempt
@login_required(login_url='/account/login')
def SaveAs(request,id,str):
	if request.method=='POST':
		data=request.POST['send']
		currentFile=User_files.objects.get(pk=id)
		currentFile.User_file=data
		currentFile.File_title=str
		currentFile.save()
		print("saved -as")
		return JsonResponse({'data':'saved as'})
	else:
		return JsonResponse({'data':'some error'})


@login_required(login_url='/account/login')
def DeleteFile(request,id):
	User_files.objects.filter(pk=id).delete()
	return JsonResponse({'data':'File Deleted'})


@login_required(login_url='/account/login')
def download(request,id):
	instance=User_files.objects.get(pk=id)
	data=instance.User_file
	return JsonResponse({'data':data})

@login_required(login_url='/account/login')
def search(request,str):
	dataQuerySet=User_files.objects.filter(File_user=request.user.id,File_title=str)
	fileName=[]
	fileId=[]
	for i in dataQuerySet:
		fileName.append(i.File_title)
		fileId.append(i.pk)
	# print(dataQuerySet)
	return JsonResponse({'data':fileName,'ids':fileId})



