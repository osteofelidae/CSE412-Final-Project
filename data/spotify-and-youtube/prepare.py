"""
Prepare raw.csv
"""


# UTILS
from src.utils.path_utils import path, Path


# DEPENDENCIES
import pandas as pd


# MAIN
if __name__ == "__main__":
    """
    # Import csv
    with open(path("data/spotify-and-youtube/raw.csv"), "r") as file:
        df = pd.read_csv(file)

    # Remove shitty column
    df = df.drop("Description", axis=1)

    # Create youtube df
    youtube_df = df.filter(["Title", "Channel", "Views", "Url_youtube", "Likes", "Artist"])

    # Insert artist ids
    with open(path("data/spotify-tracks-dataset/prepared.csv"), "r") as file:
        df_temp = pd.read_csv(file)

    # Map song_id
    youtube_df.insert(0, "song_id", [-1] * len(youtube_df), True)
    def find_song_id(title, artist):
        result = df_temp[(df_temp["track_name"] == title) & (df_temp["artists"].apply(lambda x: artist in x))]

        if len(result) > 0:
            return list(result["id"])[0]
        return -1
    def map_song_id(row):
        id = find_song_id(row["Title"], row["Artist"])
        row["song_id"] = id
        return row
    youtube_df = youtube_df.apply(map_song_id, axis=1)

    youtube_df.to_csv(path("data/spotify-and-youtube/YoutubeVideo.csv"))

    with open(path("data/spotify-and-youtube/YoutubeVideo.csv"), "r") as file:
        youtube_df = pd.read_csv(file)
    youtube_df = youtube_df.filter(["song_id", "Title", "Channel", "Views", "Url_youtube", "Likes", "Artist"])
    youtube_df2 = youtube_df[youtube_df["song_id"] != -1]

    youtube_df2.rename(columns={
        "Channel": "ChannelName",
        "Title": "SongName",
        "Views": "ViewCount",
        "Url_youtube": "URL",
        "Likes": "LikeCount"
    }, inplace=True)

    del youtube_df2["Artist"]
    """

    with open(path("data/spotify-and-youtube/YoutubeVideo.csv"), "r") as file:
        youtube_df2 = pd.read_csv(file)

    # Video ids
    current_id = 0
    video_ids = {}
    def get_or_create(video: str):
        global current_id, track_ids
        if not video_ids.get(video):
            video_ids.update({video: current_id})
            current_id += 1
        return video_ids.get(video)

    # Add id column
    youtube_df2["video_id"] = youtube_df2["SongName"].map(get_or_create)

    # Rearrange
    youtube_df2 = youtube_df2[["video_id", "song_id", "ChannelName", "SongName", "ViewCount", "URL", "LikeCount"]]

    youtube_df2.to_csv(path("data/spotify-and-youtube/YoutubeVideo.csv"))

    # Hacky way of removing first unlabelled column
    with open(path("data/spotify-and-youtube/YoutubeVideo.csv"), "r") as file:
        lines = [line.strip() for line in file.readlines()]

    with open(path("data/spotify-and-youtube/YoutubeVideo.csv"), "w") as file:
        file.writelines([",".join(line.split(",", 1)[1:])+"\n" for line in lines])
