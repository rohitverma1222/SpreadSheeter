from django.urls import path,include
from .views import *
urlpatterns = [
    #index/Home Page
    path('',index,name="home"),
    path('help',helpArticle,name="help"),
    path('dashboard/',dashBoard,name='dashBoard'),
    path('save/<int:id>/',save,name='save'),
    path('<int:id>/',openFile,name='open'),
    path('deletefile/<int:id>/',DeleteFile,name="delete"), 
    path('<int:id>/<str:str>/',SaveAs,name='saveas'),
    path('download/<int:id>/',download,name='insert_file'),
    path('search/<str:str>/',search,name='search')
]
