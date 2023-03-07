from django.shortcuts import render
from optparse import Values
from django.http import JsonResponse
from rest_framework import permissions,filters,generics,status
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json 
import random
from django.core import serializers
from django.forms.models import model_to_dict
from django.db.models import Q

from .serializers import GenreSerializer, LikeSerializer,SongSerializer,ArtistSerializer,FollowSerializer,PlaylistSerializer
from .models import Song,Artist,Genre,Like,Follow,Playlist
from main.models import User
from .filters import SongFilter
# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/token',
        '/api/token/referesh',
        '/api/artist',
        '/api/artist/id:',
        '/api/song',
        '/api/song/id:',
    ]
    return Response(routes)


def pick_random_object():
   return random.randrange(1, Song.objects.all().count() + 1)

#Song call
@api_view(['GET'])
def getSong(request):
    query=request.query_params.get('q',None)
    print(query)
    if query is not None:
        song_filter=Song.objects.filter(title__icontains=query)
        serializer=SongSerializer(song_filter,many=True)
        return Response(serializer.data)
    else :
        song_filter=Song.objects.all().filter(id=pick_random_object())[0:4] 
        def get_queryset(self):
          song_filter=Song.objects.all().filter(id = pick_random_object())[0:4] 
          serializer=SongSerializer(song_filter,many=True)
          return Response(serializer.data)       
    
    



@api_view(['GET'])
def getSingleTrack(request,pk):
    song=Song.objects.get(id=pk)
    serializer=SongSerializer(song,many=False)
    return Response(serializer.data)



#Artist calls
@api_view(['GET'])
def getArtist(request):
    artist_filter=[]
    query=request.query_params.get('q',None)
    # query=request.GET.get('q',None)
    print(query)
    
    if query is not None:
        artist_filter=Artist.objects.filter(name__icontains=query)[0:4]
        

    serializer=ArtistSerializer(artist_filter,many=True)
    return Response(serializer.data) 


@api_view(['GET'])
def getSingleArtist(request,pk):
    artists=Artist.objects.get(id=pk)
    serializer=ArtistSerializer(artists,many=False)
    return Response(serializer.data)   

# @api_view(['GET'])
# def getUserProfile(request,pk):
#     user=User.objects.get(username=pk)
#     profile=Profile.objects.get(user=user)
#     serializer=ProfileSerializer(profile,many=False)
#     return Response(serializer.data)  

@api_view(['GET'])
def getGenre(request):
    genre=Genre.objects.all()
    serializer=GenreSerializer(genre,many=True)
    return Response(serializer.data)   

@api_view(['GET'])
def getSinglegenre(request,pk):
    genre=Genre.objects.get(id=pk)
    serializer=GenreSerializer(genre,many=False)
    return Response(serializer.data)  
# profile 


# @api_view(['POST'])
# def profileCreate(request):
#     serializer=ProfileSerializer(data=request.data)

#     if  serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)  

# @api_view(['POST'])
# def profileUpdate(request,pk):
#     profile=Profile.objects.get(id=pk)
#     serializer=ProfileSerializer(instance=Profile,data=request.data)
#     if  serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)  

# @api_view(['DELETE'])
# def ProfileDelete(request,pk):
#     profile=Profile.objects.get(id=pk)
#     profile.delete()

#     return Response('item deleted successfully')        


@api_view(['POST'])
def Likesong(request,pk):
    user=User.objects.get(id=pk)
    username=user.id
    song_id=request.data.get('song')
    # song_id=request.GET.get('song_id')   
    song=Song.objects.get(id=song_id)
    
    like_filter=Like.objects.filter(song=song,username=username).first()

    if like_filter==None:
        Like.objects.create(song=song,username=username)
        # serializer=LikeSerializer(data={'song':song,'username':username})
        # if serializer.is_valid():
        #     serializer.save()
        # return Response(serializer.data)  
        return Response('like object created')  
    else:
        like_filter.delete()        
        return Response('like object deleted')


@api_view(['GET'])
def Likecheck(request,pk):
    user=User.objects.get(id=pk)
    username=user.id
    song_id=request.GET.get('song_id')
    song=Song.objects.get(id=song_id)
    like_filter=Like.objects.filter(song=song,username=username).first()
    if like_filter==None:
       return Response(False)
    else:
        return Response(True)

@api_view(['GET'])
def getlike(request,pk):
    user=User.objects.get(id=pk)
    username=user.id
    like_filter=Like.objects.filter(username=username)
    serializer=LikeSerializer(like_filter,many=True)
    print(like_filter)
    return Response(serializer.data)


@api_view(['POST'])
def Followartist(request,pk):
    user=User.objects.get(id=pk)
    username=user.id
    artist_id=request.data.get('artist')
    artist=Artist.objects.get(id=artist_id)
    follow_filter=Follow.objects.filter(artist=artist,username=username).first()
    if follow_filter==None:
        Follow.objects.create(artist=artist,username=username)
        return Response('follow object created')
    else:
        follow_filter.delete()
        return Response('follow object deleted') 

@api_view(['GET'])
def Followcheck(request,pk):
    user=User.objects.get(id=pk)
    username=user.id
    artist_id=request.GET.get('artist_id')
    artist=Artist.objects.get(id=artist_id)
    follow_filter=Follow.objects.filter(artist=artist,username=username).first()
    if follow_filter==None:
       return Response(False)
    else:
        return Response(True)

@api_view(['GET'])
def getfollow(request,pk):
    user=User.objects.get(id=pk)
    username=user.id
    follow_filter=Follow.objects.filter(username=username)
    serializer=FollowSerializer(follow_filter,many=True)
    print(follow_filter)
    return Response(serializer.data)


@api_view(['GET'])
def getgenresong(request,pk):
    genre=Genre.objects.get(id=pk)
    name=genre.title
    song_filter=Song.objects.filter(genre__title=name)
    serializer=SongSerializer(song_filter,many=True)
    print(song_filter)
    return Response(serializer.data)    


@api_view(['GET'])
def getartistsong(request,pk):
    artist=Artist.objects.get(id=pk)
    name=artist.name
    song_filter=Song.objects.filter(artist__name=name)
    serializer=SongSerializer(song_filter,many=True)
    return Response(serializer.data)       



# @api_view(['GET'])
# def getprofile(request,pk):
#     profile=Profile.objects.get(id=pk)
#     serializer=ProfileSerializer(profile,many=False)
#     return Response(serializer.data)

# @api_view(['POST'])
# def profileupdate(request,pk):
#     profile=Profile.objects.get(id=pk)
#     print('hi')
#     print(request.data)
#     print('hi')
#     serializer=ProfileSerializer(instance=profile,data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data) 

# @api_view(['GET'])
# def getuserprofile(request,pk):
#     user=User.objects.get(username=pk)
#     profile_filter=Profile.objects.filter(user=user)
#     print(profile_filter)
#     serializer=ProfileSerializer(profile_filter)
#     return Response(serializer.data) 

@api_view(['POST'])
def createplaylist(request):
    username=request.data['username']
    user=User.objects.get(id=username)
    title=request.data['title']
    playlist=Playlist.objects.create(title=title,user=user)
    # serializer=PlaylistSerializer(data=request.data)
    # if  serializer.is_valid():
    #     serializer.save()
    serializer=PlaylistSerializer(playlist)
    # playlist.user=user
    # playlist.save()
    # playlist.songs.add(*songs)S
    # return Response(serializer.data)
    return Response(serializer.data)

@api_view(['POST'])
def updateplaylist(request,pk):
    song_id=request.data['songid']
    playlist_filter=Playlist.objects.filter(songs=song_id)
    if(playlist_filter):
        return Response('Song already present in the playlist!')
    else:
        song=Song.objects.get(id=song_id)
        playlist=Playlist.objects.get(id=pk)
        playlist.songs.add(song)
        return Response('playlist updated!')
    
@api_view(['DELETE'])
def deleteplaylistsong(request,pk):
    
    song=Song.objects.get(id=pk)
    playlist=Playlist.objects.filter(songs=pk).first()   
    print(playlist)
    playlist.songs.remove(song)
    
    return Response('request delete send')

@api_view(['GET'])
def getplaylist(request,pk):
    user=User.objects.get(id=pk)
    playlist_filter=Playlist.objects.filter(user=user)
    print(playlist_filter)
    serializer=PlaylistSerializer(playlist_filter,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getsingleplaylist(request,pk):
    playlist=Playlist.objects.get(id=pk)
    serializer=PlaylistSerializer(playlist)
    return Response(serializer.data) 

@api_view(['DELETE'])
def deletesingleplaylist(request,pk):
    playlist=Playlist.objects.get(id=pk)
    playlist.delete()
    return Response('Playlist deleted')      