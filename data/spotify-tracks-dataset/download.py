"""
Download dataset from HuggingFace
"""


# UTILS
from src.utils.path_utils import path, Path


# DEPENDENCIES
import datasets


# MAIN
if __name__ =="__main__":

    ds: datasets.Dataset = datasets.load_dataset("maharshipandya/spotify-tracks-dataset")["train"]
    ds.to_csv(path("data/spotify-tracks-dataset/raw.csv"))
