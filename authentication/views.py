from django.shortcuts import render,redirect
from django.contrib import messages
from django.contrib.auth.models import User,auth
# Create your views here.
def Login_user(request):
	if request.method=='POST':
		username=request.POST['username']
		password=request.POST['password']
		user=auth.authenticate(username=username,password=password)

		if user is not None:
			auth.login(request,user)
			return redirect("user/dashboard")
		else:
			messages.warning(request, 'Please Fill correct username and Password')
			return redirect('login')
	else:
		return render(request,'login.html')

def Register_user(request):
	if request.method=='POST':
		#data from html form
		fullName=request.POST['fullname']
		username=request.POST['username']
		email=request.POST['email']
		password1=request.POST['password1']
		password2=request.POST['password2']

		if User.objects.filter(username=username).exists():
				#if username exist then show some messages
			messages.warning(request, 'Username Exist please use Another Username')
			return render(request,'register.html')
		if User.objects.filter(email=email).exists():
			messages.warning(request, 'Email Exist please use Another Email')
			return render(request,'register.html')

		if password1==password2:
			messages.warning(request, 'User Registration Successfully Completed please LOGIN')
			user=User.objects.create_user(username=username,email=email,password=password1,first_name=fullName)
			user.save();
			return redirect('login')
		else:
			messages.warning(request, 'Password is Not Same please fill again')
			return redirect('register')
	else:
		return render(request,'register.html')


def Logout_user(request):
	auth.logout(request)
	return redirect('/')