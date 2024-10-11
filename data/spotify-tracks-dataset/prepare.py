"""
Prepare raw.csv
"""


# UTILS
from src.utils.path_utils import path, Path


# DEPENDENCIES
import pandas as pd


# MAIN
if __name__ == "__main__":

    # Import csv
    with open(path("data/spotify-tracks-dataset/raw.csv"), "r") as file:
        df = pd.read_csv(file)

    # Get allowed artists
    with open(path("data/spotify-top-artists-by-monthly-listeners/raw.csv"), "r") as file:
        df_temp = pd.read_csv(file)
    allowed_artists = list(df_temp["Artist"])

    # Filter out all songs with disallowed artists
    def filter_artists(artists_str):
        artists = [x.strip() for x in str(artists_str).split(";")]
        for artist in artists:
            if artist not in allowed_artists:
                return False
        return True
    criteria = df["artists"].apply(filter_artists)
    df = df[criteria]

    # Track ids
    current_id = 0
    track_ids = {}
    def get_or_create(track: str):
        global current_id, track_ids
        if not track_ids.get(track):
            track_ids.update({track: current_id})
            current_id += 1
        return track_ids.get(track)

    # Add id column
    df["id"] = df["track_id"].map(get_or_create)

    # Rearrange columns
    df = df[['id', 'track_id', 'artists', 'album_name', 'track_name', 'popularity', 'duration_ms', 'explicit', 'danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'time_signature', 'track_genre']]

    # Save as csv
    df.to_csv(path("data/spotify-tracks-dataset/prepared.csv"))

    # Hacky way of removing first unlabelled column
    with open(path("data/spotify-tracks-dataset/prepared.csv"), "r") as file:
        lines = [line.strip() for line in file.readlines()]

    with open(path("data/spotify-tracks-dataset/prepared.csv"), "w") as file:
        file.writelines([",".join(line.split(",", 1)[1:])+"\n" for line in lines])
