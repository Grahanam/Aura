from rest_framework.serializers import ModelSerializer
from .models import Song,Artist,Genre,Like,Follow,Playlist

# class CreateUserSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = [ 'username', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User(
#             username=validated_data['username'],
#         )
#         user.set_password(validated_data['password'])
#         user.save()
#         return user

# class NoteSerializer(ModelSerializer):
#     class Meta:
#         model=Note
#         fields='__all__' 


class SongSerializer(ModelSerializer):
    class Meta:
        model=Song
        fields='__all__'

class ArtistSerializer(ModelSerializer):
    class Meta:
        model=Artist
        fields='__all__'        

class GenreSerializer(ModelSerializer):
    class Meta:
        model=Genre
        fields='__all__'

class LikeSerializer(ModelSerializer):
    # song=SongSerializer(read_only=True)

    class Meta:
        model=Like
        # fields=('song','username')
        fields = '__all__'      

class FollowSerializer(ModelSerializer):
    class Meta:
        model=Follow
        fields='__all__'

# class ProfileSerializer(ModelSerializer):
#     class Meta:
#         model=Profile
#         fields='__all__'  

class PlaylistSerializer(ModelSerializer):
    # songs=SongSerializer(read_only=True,many=True)

    class Meta:
        model=Playlist
        # fields=('id','title','user','songs')
        fields='__all__' 

