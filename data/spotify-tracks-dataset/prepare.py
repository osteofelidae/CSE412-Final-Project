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

    # Artist ids
    current_id = 0
    track_ids = {}
    def get_or_create(artist: str):
        global current_id, track_ids
        if not track_ids.get(artist):
            track_ids.update({artist: current_id})
            current_id += 1
        return track_ids.get(artist)


    # Add id column
    df["id"] = df["track_id"].map(get_or_create)

    # Rearrange columns
    df = df[['id', 'track_id', 'artists', 'album_name', 'track_name', 'popularity', 'duration_ms', 'explicit', 'danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'time_signature', 'track_genre']]

    # Save as csv
    df.to_csv(path("data/spotify-tracks-dataset/prepared.csv"))
