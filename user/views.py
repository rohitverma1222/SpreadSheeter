from fileinput import filename
from django.shortcuts import render, redirect
from django.http import HttpResponse
from . models import User_files
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from authentication.views import Login_user


def index(request):
    current_user = request.user.id
    if request.method == 'POST':
        NameOfFile = request.POST['new-file-name']
        user_id = User.objects.get(id=current_user)
        user_upload = User_files.objects.create(
            File_title=NameOfFile, User_file="", File_user=user_id)
        user_upload.save()
        IDs = user_upload.id
        return render(request, 'index.html', {'NameOfFile': NameOfFile, 'IDs': IDs})
    else:
        return render(request, 'index.html')


def helpArticle(request):
    return render(request, 'help.html')


@login_required(login_url='/account/login')
def dashBoard(request):
    UserFileQuerySet = User_files.objects.filter(
        File_user=request.user.id).order_by('-updated')
    return render(request, 'dashBoard.html', {'queryset': UserFileQuerySet})


@login_required(login_url='/account/login')
def openFile(request, id):
    GetfileObj = User_files.objects.get(pk=id)
    filedata = GetfileObj.User_file
    FileName = GetfileObj.File_title
    IDs = id
    return render(request, 'index.html', {'data': filedata, 'NameOfFile': FileName, 'IDs': IDs})


@csrf_exempt
@login_required(login_url='/account/login')
def save(request, id):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        print("inside ajax")
        data = request.POST['send']

        user_obj = User_files.objects.get(pk=id)
        user_obj.User_file = data
        user_obj.save()
        print("save")
        return JsonResponse({'data': 'Saved'})
    else:
        return JsonResponse({'data': 'sorry something wrong'})


@csrf_exempt
@login_required(login_url='/account/login')
def SaveAs(request, id, str):
    if request.method == 'POST':
        data = request.POST['send']
        currentFile = User_files.objects.get(pk=id)
        currentFile.User_file = data
        currentFile.File_title = str
        currentFile.save()
        print("saved -as")
        return JsonResponse({'data': 'saved as'})
    else:
        return JsonResponse({'data': 'some error'})


@login_required(login_url='/account/login')
def DeleteFile(request, id):
    User_files.objects.filter(pk=id).delete()
    return JsonResponse({'data': 'File Deleted'})


@login_required(login_url='/account/login')
def download(request, id):
    instance = User_files.objects.get(pk=id)
    data = instance.User_file
    return JsonResponse({'data': data})


@login_required(login_url='/account/login')
def search(request, str):
    dataQuerySet = User_files.objects.filter(
        File_user=request.user.id, File_title=str)
    fileName = []
    fileId = []
    for i in dataQuerySet:
        fileName.append(i.File_title)
        fileId.append(i.pk)
    return JsonResponse({'data': fileName, 'ids': fileId})
