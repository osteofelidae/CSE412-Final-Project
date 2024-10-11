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
    with open(path("data/spotify-top-artists-by-monthly-listeners/raw.csv"), "r") as file:
        df = pd.read_csv(file)

    # Artist ids
    current_id = 0
    artist_ids = {}
    def get_or_create(artist: str):
        global current_id, artist_ids
        if not artist_ids.get(artist):
            artist_ids.update({artist: current_id})
            current_id += 1
        return artist_ids.get(artist)

    # Add id column
    df["id"] = df["Artist"].map(get_or_create)

    # Reformat various columns to numbers
    columns_to_map = ["Listeners", "Daily Trend", "PkListeners"]
    def to_number(s):
        return int(s.replace(",", "").strip())
    for col in columns_to_map:
        df[col] = df[col].map(to_number)

    # Rearrange columns
    df = df[["id", "Artist", "Listeners", "Daily Trend", "Peak", "PkListeners"]]

    # Save as csv
    df.to_csv(path("data/spotify-top-artists-by-monthly-listeners/prepared.csv"))
