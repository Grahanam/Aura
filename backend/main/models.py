from django.db import models
from django.contrib.auth import get_user_model
import uuid


# Create your models here.
User = get_user_model()


class Artist(models.Model):
    id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    name=models.CharField(max_length=100)
    img=models.ImageField(null=True)
    imgcover=models.ImageField(blank=True)
    # user=models.ForeignKey(User,on_delete=models.CASCADE)
    description=models.TextField(blank=True)
    def __str__(self):
        return self.name

class Genre(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4)
    title=models.CharField(max_length=100)
    img=models.ImageField(blank=True)
    imgcover=models.ImageField(blank=True)
    def __str__(self):
        return self.title

class Song(models.Model):
    id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    title=models.CharField(max_length=100)
    song = models.FileField(max_length=30)
    img=models.ImageField(blank=True)
    artist=models.ManyToManyField(Artist)
    genre=models.ManyToManyField(Genre)
    length=models.CharField(max_length=30)

    # artist=models.ManyToManyField(Artist)
    def __str__(self):
        return self.title
      
class Like(models.Model):
    # song_id=models.CharField(max_length=100,blank=True)
    id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    song=models.ForeignKey(Song, on_delete=models.CASCADE,null=True)
    username=models.CharField(max_length=100,blank=True)
    def __str__(self):
        return f'{self.username} {self.song.title}'

class Follow(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4)
    artist=models.ForeignKey(Artist,on_delete=models.CASCADE,null=True)
    username=models.CharField(max_length=100,blank=True)
    def __str__(self):
        return f'{self.username} {self.artist.name}'

class Playlist(models.Model):
    id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    title=models.TextField(max_length=100)
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    songs=models.ManyToManyField(Song,blank=True)

    def __str__(self):
        return f'{self.user} {self.title}'