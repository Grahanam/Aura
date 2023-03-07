from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns=[
    path('',views.getRoutes),
    # path('create/', customUserCreate.as_view(), name="create_user"),
    path(r'artist/',views.getArtist,name='getArtist'),
    path('artist/<str:pk>/',views.getSingleArtist),
    path('getartistsong/<str:pk>/',views.getartistsong),
    path(r'song/',views.getSong,name='getSong'),
    path('song/<str:pk>/',views.getSingleTrack),
    # path('user/<str:pk>/',views.getUserProfile),
    path('like/<str:pk>/',views.Likesong),
    path('likecheck/<str:pk>/',views.Likecheck),
    path('getlike/<str:pk>',views.getlike),
    path('follow/<str:pk>/',views.Followartist),
    path('followcheck/<str:pk>/',views.Followcheck),
    path('getfollow/<str:pk>',views.getfollow),
    path('genre/',views.getGenre),
    path('genre/<str:pk>/',views.getSinglegenre),
    path('getgenresong/<str:pk>/',views.getgenresong),
    # path('profile/<str:pk>/',views.getprofile),
    # path('getprofile/<str:pk>',views.getuserprofile),
    # path('profileupdate/<str:pk>/',views.profileUpdate),
    path('playlist/',views.createplaylist),
    path('playlist/delete/<str:pk>',views.deletesingleplaylist),
    path('playlist/<str:pk>',views.getsingleplaylist),
    path('playlistupdate/<str:pk>',views.updateplaylist),
    path('getplaylist/<str:pk>',views.getplaylist),
    path('playlist/song/delete/<str:pk>',views.deleteplaylistsong),
    
]