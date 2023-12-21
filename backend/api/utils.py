from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from requests import get, post
import time
import csv
from requests.exceptions import HTTPError
import environ

env = environ.Env()

TOP_ARTISTS_URL = 'https://api.spotify.com/v1/me/top/artists'
TOP_TRACKS_URL = 'https://api.spotify.com/v1/me/top/tracks'
PLAYLISTS_URL = 'https://api.spotify.com/v1/me/playlists'
SEVERAL_TRACKS_URL = 'https://api.spotify.com/v1/tracks'
AUDIO_FEATURES_URL = 'https://api.spotify.com/v1/audio-features'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
CURRENT_USER_URL = 'https://api.spotify.com/v1/me'

def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token=None):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'expires_in', 'token_type'])

    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token, 
                              refresh_token=refresh_token, token_type=token_type, 
                              expires_in=expires_in)
        tokens.save()

def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)

        return True
    
    return False

def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token
    response = post(TOKEN_URL, params={
        'grant_type': 'refresh_token',
        'refresh_token': f'{refresh_token}',
        'client_id': env('CLIENT_ID'),
        'client_secret': env('CLIENT_SECRET')
    }, headers={
        'Content-type': 'application/x-www-form-urlencoded'
    }).json()
    
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_or_create_user_tokens(session_id, access_token, token_type, expires_in)

def make_request(session_id, url, headers, params={}, request_type="get", json={}):
    max_retries = 5
    retries = 0
    while retries < max_retries:
        try:
            if request_type == "get":
                response = get(url, headers=headers, params=params)
                response.raise_for_status()
                return response
            else:
                response = post(url, headers=headers, params=params, json=json)
                response.raise_for_status()
                return response

        except HTTPError as e:
            if e.response.status_code == 429:
                #rate limit
                retry_after = int(e.response.headers.get('Retry-After', 10))
                print(f"Rate limited. Waiting for {retry_after} seconds before retrying...")
                time.sleep(retry_after)
                refresh_spotify_token(session_id)
                retries += 1
            elif e.response.status_code == 401:
                #expired token
                refresh_spotify_token(session_id)
            else:
                raise
    raise Exception("Max retries reached. Request failed.")

def get_top_songs(session_id):
    terms = ['long_term', 'medium_term', 'short_term']
    responses = []
    token = get_user_tokens(session_id).access_token
    print(token)
    for i in range(3):
        try:
            response = make_request(session_id, TOP_TRACKS_URL,
                                    headers={
                                        'Authorization': f'Bearer {token}'
                                    },
                                    params={
                                        'time_range': f'{terms[i]}',
                                        'limit': '50'
                                    })
            responses.append(response.json())
        except Exception as e:
            print(f'Error while fetching top tracks: {e}')

    ids = []
    for i in range(3):
        data = responses[i]
        for j in range(50):
            id_ = data['items'][j]['id']
            if id_ not in ids:
                ids.append(id_)

    return ids


def get_playlists(session_id):
    token = get_user_tokens(session_id).access_token
    playlist_ids = []
    response = make_request(session_id, PLAYLISTS_URL, 
                            headers={
                                'Authorization': f'Bearer {token}'
                            })
    data = response.json()
    items = data['items']
    for item in items:
        playlist_ids.append(item['id'])

    return playlist_ids

def get_playlist_tracks(session_id, playlist_ids):
    token = get_user_tokens(session_id).access_token
    track_ids = []
    for playlist_id in playlist_ids:
        response = make_request(session_id, f'https://api.spotify.com/v1/playlists/{playlist_id}',
                                headers={
                                    'Authorization': f'Bearer {token}'
                                })
        data = response.json()
        tracks = data['tracks']['items']
        for track in tracks:
            track_ids.append(track['track']['id'])
    return track_ids


def get_top_artists(session_id):
    terms = ['long_term', 'medium_term', 'short_term']
    responses = []
    token = get_user_tokens(session_id).access_token
    artists = []
    

    for i in range(3):
        try:
            response = make_request(session_id, TOP_ARTISTS_URL,
                        headers={
                            'Authorization': f'Bearer {token}'
                        },
                        params={
                            'time_range': f'{terms[i]}',
                            'limit': '50'
                        }
            )
            responses.append(response.json())
        except Exception as e:
            print(f'Error while fetching top artists: {e}')
        
    ids = []
    for i in range(3):
        data = responses[i]
        print(data)
        for j in range(len(data['items'])):
            id_ = data['items'][j]['id']
            name = data['items'][j]['name']
            popularity = data['items'][j]['popularity']
            if id_ not in ids:
                ids.append(id_)
                artists.append([id_, name, popularity])
    return artists

def scrape_more_artists(top_artists, session_id):
    token = get_user_tokens(session_id).access_token
    underground_artists = []
    all_ids_searched = [artist[0] for artist in top_artists]
    artists_step_x = top_artists
    print('first round of scraping has top artists.')
    while len(underground_artists) < 300:
        print(f'current length of underground list is {len(underground_artists)}')
        next_step = []
        for artist in artists_step_x:
            try:
                response = make_request(session_id, f'https://api.spotify.com/v1/artists/{artist[0]}/related-artists',
                            headers={
                                'Authorization': f'Bearer {token}'
                            }

                )
                data = response.json()
                artists = data['artists']
                for artist in artists:
                    id_ = artist['id']
                    name = artist['name']
                    popularity = artist['popularity']
                    if id_ not in all_ids_searched:
                        print(f'new artist --- name: {name}, popularity: {popularity}')
                        all_ids_searched.append(id_)
                        next_step.append([id_, name, popularity])
                        if 7 <= popularity <= 35:
                            print(f'underground artist found: name: {name}, popularity: {popularity}')
                            underground_artists.append([id_, name, popularity])
                            if len(underground_artists) > 300:
                                return underground_artists
            except Exception as e:
                print(f'Error while scraping more artists: {e}')
        artists_step_x = next_step
    return underground_artists


def get_artists_albums(artist_id, session_id):
    # Scrapes an artist's albums
    token = get_user_tokens(session_id).access_token
    album_ids = []
    try:
        response = make_request(session_id,
            f'https://api.spotify.com/v1/artists/{artist_id}/albums',
            headers={'Authorization': f'Bearer {token}'},
            params={'limit': '5', 'offset': '0'}
        )
        data = response.json()
        albums = data['items']
        for album in albums:
            if album['id'] not in album_ids:
                album_ids.append(album['id'])
    except Exception as e:
        print(f"Error while fetching albums for artist {artist_id}: {e}")
        # Handle or log the error as needed

    return album_ids


def get_artists_tracks(album_ids, session_id):
    #takes artists albums and scrapes each one's tracks
    token = get_user_tokens(session_id).access_token
    track_ids = []
    for id_ in album_ids:
        try:
            response = make_request(session_id, f'https://api.spotify.com/v1/albums/{id_}/tracks',
                        headers={
                            'Authorization': f'Bearer {token}'
                        },
                        params={
                            'limit': '50'
                        })
            data = response.json()
            tracks = data['items']
            for track in tracks:
                if track['id'] not in track_ids:
                    track_ids.append(track['id'])
        except Exception as e:
            print(f'Error while fetching tracks for album{id_}: {e}')
    return track_ids

def get_attributes(chunk, session_id):
    # Takes a chunk of track ids and gathers necessary track attributes
    gen_atts = ['name', 'popularity', 'explicit']
    analysis_atts =  ['duration', 'end_of_fade_in', 'start_of_fade_out', 
                'loudness', 'tempo', 'tempo_confidence', 'time_signature', 'time_signature_confidence', 'key', 'key_confidence', 'mode', 'mode_confidence']
    feature_atts = ['danceability', 'energy', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence']
    token = get_user_tokens(session_id)
    token = token.access_token
    try:
        response = make_request(session_id,
            SEVERAL_TRACKS_URL,
            headers={'Authorization': f'Bearer {token}'},
            params={'ids': ','.join(chunk)}
        )
        samples = []
        data = response.json()
        tracks = data['tracks']
        
        for track in tracks:
            attributes = []
            artists = []
            track_id = track['id']
            attributes.append(track_id)
            for artist in track['artists']:
                artists.append(artist['name'])  # Get all artists on track
            attributes.append(artists)

            for att in gen_atts:
                if att in track:
                    attributes.append(track[att])  # Get general attributes
                else:
                    attributes.append(None)
            
           

            # try:
            #     response = make_request(
            #         f'https://api.spotify.com/v1/audio-analysis/{track_id}',
            #         headers={'Authorization': f'Bearer {token}'},
            #         params={'id': {track_id}}
            #     )
            #     data = response.json()
            #     data = data['track']
            #     for att in analysis_atts:
            #         if data and att in data:
            #             attributes.append(data[att])
            #         else:
            #             attributes.append(None)
            # except Exception as e:
            #     print(f"Error while fetching audio analysis for track {track_id}: {e}")
            #     # Handle or log the error as needed

            samples.append(attributes)
        
        # Get feature attributes
        # time.sleep(5)
        response = make_request(session_id,
            AUDIO_FEATURES_URL,
            headers={'Authorization': f'Bearer {token}'},
            params={'ids': ','.join(chunk)}
        )
        data = response.json()
        features = data['audio_features']
        i = 0
        for feature in features:
            temp = []
            for att in feature_atts:
                if feature and att in feature:
                    temp.append(feature[att])
                else:
                    temp.append(None)
            samples[i].extend(temp)
            print(samples[i])
            
            i += 1

        return samples

    except Exception as e:
        print(f"Error while fetching attributes: {e}")
        return []

def generate_samples(tracks, session_id):
    # gathering data from each individual track


    samples = []
    token = get_user_tokens(session_id).access_token
    
    track_chunks = [tracks[i:i+50] for i in range(0, len(tracks), 50)]

    for chunk in track_chunks:
        chunk_samples = get_attributes(chunk, session_id)
        for sample in chunk_samples:
            samples.append(sample)
        
    return samples

def writeLabelsToFile(fields, fileType, username):
    filename = "Spotify_" + fileType + "_data_" + username + ".txt"
    with open(filename, 'a', encoding="utf-8") as file:
        write = csv.writer(file)
        write.writerow(fields)

def writeSongsToFile(data, fileType, username):
    filename = "Spotify_" + fileType + "_data_" + username + ".txt"
    with open(filename, 'a', encoding="utf-8") as file:
        write = csv.writer(file)
        for sample in data:
            write.writerow(sample)

def rowFields():
    return ['id', 'artist_name(s)', 'song_name', 'popularity', 'explicit?',
         'danceability', 'energy', 'speechiness', 
        'acousticness', 'instrumentalness', 'liveness', 'valence']


#"""'duration', 'end_of_fade_in', 'start_of_fade_out', 
#       'loudness', 'tempo', 'tempo_confidence', 'time_signature', 
#        'time_signature_confidence', 'key', 'key_confidence', 'mode', 
#        'mode_confidence'"""
# def get_playlist_artists(ids, token):
#     response = get(PLAYLISTS_URL,
#                    headers={
#                        'Authorization': f'Bearer {token}'
#                    },
#                    params={
#                        'limit': '20'
#                    }
#     )
#     data = response.json()
#     items = data['items']
#     for i in range(len(items)):
#         link = items[i]['tracks']['href']

#         track_response = get(link, 
#                             headers={
#                                 'Authorization': f'Bearer {token}'
#                             }
#         )
#         tracks_data = track_response.json()
#         tracks_items = tracks_data['items']
#         for j in range(len(tracks_items)):
#             artist_id = tracks_items[j]['track']['artists'][0]['name']
#             if artist_id not in ids:
#                 ids.append(artist_id)

#     return(ids)

def get_user_id(session_id):
    token = get_user_tokens(session_id).access_token
    try:
            response = make_request(session_id, CURRENT_USER_URL,
                        headers={
                            'Authorization': f'Bearer {token}'
                        })
            
            data = response.json()
            print(data['id'])
            return data['id']
            
    except Exception as e:
        print(f'Error while fetching user_id: {e}')


def make_playlist(ids, session_id):
    user_id = get_user_id(session_id)
    token = get_user_tokens(session_id).access_token
    
    try:
        response = make_request(session_id, f'https://api.spotify.com/v1/users/{user_id}/playlists',
                    headers={
                        'Authorization': f'Bearer {token}',
                        'Content-type': 'application/json'
                    }, 
                    json={
                        'name': 'Nice playlist bro',
                        'description': 'Your underground playlist powered by Hurd Haven.'
                    },
                    request_type="post")
        data = response.json()
        playlist_id = data['id']
        

        try:
            response = make_request(session_id, f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks',
                                    headers={
                                        'Authorization': f'Bearer {token}',
                                        'Content-type': 'application/json',
                                        
                                    },
                                    params={
                                        'uris': ','.join([f"spotify:track:{id_}" for id_ in ids])
                                    },
                                    request_type="post")

        except Exception as e:
            print(f'Error while adding items to playlist: {e}')
        
            
    except Exception as e:
        print(f'Error while creating playlist: {e}')

    

    
    


                                                                                                                                                                   