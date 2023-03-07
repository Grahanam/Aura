from django.contrib import admin
from .models import Song,Artist,Genre,Like,Follow,Playlist
# Register your models here.



admin.site.register(Artist)
admin.site.register(Song)
admin.site.register(Genre)
admin.site.register(Like)
admin.site.register(Follow)
admin.site.register(Playlist)