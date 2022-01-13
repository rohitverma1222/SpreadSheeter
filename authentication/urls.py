from django.urls import path,include
from .views import *
urlpatterns = [
    path('login',Login_user,name="login"),
    path('register',Register_user,name="register"),
    path('logout',Logout_user,name="logout"),
    path('user/',include('user.urls')),
]
