from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.core.mail import send_mail
import environ
from requests import Request, post, get
from .utils import update_or_create_user_tokens, get_user_tokens, get_top_artists, get_artists_albums, get_artists_tracks, generate_samples, writeLabelsToFile, writeSongsToFile, rowFields, scrape_more_artists, get_top_songs, make_playlist, get_playlists, get_playlist_tracks, get_user_id
from .learn import learn
from django.http import HttpResponse
env = environ.Env()
AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
API_BASE_URL = 'https://api.spotify.com/v1/'


@api_view(['POST'])
@method_decorator(csrf_exempt)
def sendMail(request):
    if request.method == 'POST':
        data = request.data
        name = data['name']
        email = data['email']
        message = data['message']

        subject = f'Someone sent you a message from Hurd Haven!'
        body = f'From: {name}\n\nEmail: {email}\n\n\n\n{message}'
        send_mail(
            subject,
            body,
            env('EMAIL_HOST_USER'),
            ['jackhenry.hurd@gmail.com']
        )
        return Response(request.data, status=status.HTTP_200_OK)



    else:
        return Response(request.data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@method_decorator(csrf_exempt)
def login(request):
    # authenticate user's spotify account.
    scopes = 'playlist-read-private user-top-read playlist-modify-private playlist-modify-public user-read-recently-played'

    url = Request('GET', AUTH_URL, params={
        'scope': scopes,
        'response_type': 'code',
        'redirect_uri': env('REDIRECT_URI'),
        'client_id': env('CLIENT_ID'),
    }).prepare().url

    return Response({'url': url}, status=status.HTTP_200_OK)

def callback(request):

    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post(TOKEN_URL, data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': env('REDIRECT_URI'),
        'client_id': env('CLIENT_ID'),
        'client_secret': env('CLIENT_SECRET')
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')
    print(access_token)
    print(request.session.session_key)

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(request.session.session_key, access_token,
                                 token_type, expires_in, refresh_token)

    if access_token:
        return HttpResponse(
        '<script> window.location.replace("/spotbot/home"); </script>'
        )
    else:
        return HttpResponse(
            '<script> window.location.replace("/spotbot"); window.localStorage.setItem("loggedIn" : "false"); </script>'
        )
@api_view(['GET'])
@method_decorator(csrf_exempt)
def reccomend(request):
    
    session_id = request.session.session_key
    username = get_user_id(session_id)
    print('getting top songs...')
    top_track_ids = get_top_songs(session_id)
    print('analyzing top track data...')
    top_track_data = generate_samples(top_track_ids, session_id)
    print('writing top track data to file...')
    writeLabelsToFile(rowFields(), "base", username)
    writeSongsToFile(top_track_data, "base", username)
    print('getting top artists...')
    top_artists = get_top_artists(session_id)
    print(top_artists)
    print("scraping underground artists...")
    underground_artists = scrape_more_artists(top_artists, session_id)
    print(underground_artists)
    writeLabelsToFile(rowFields(), "scraped", username)
    i = 0
    ids = [artist[0] for artist in underground_artists]
    names = [artist[1] for artist in underground_artists]
    for id_ in ids:
        print('gathering albums from {}...'.format(names[i]))
        album_ids = get_artists_albums(id_, session_id)
        print('gathering tracks from {}''s albums...'.format(names[i]))
        track_ids = get_artists_tracks(album_ids, session_id)
        print('analyzing track data from {}...'.format(names[i]))
        track_data = generate_samples(track_ids, session_id)
        print('writing {}''s track data to file...'.format(names[i]))
        writeSongsToFile(track_data, "scraped", username)
        i += 1
        print(f'{(i / len(ids) * 100)}% complete.')
    ids = learn(username)
    make_playlist(ids, session_id)
    



    return Response(status=status.HTTP_200_OK)


