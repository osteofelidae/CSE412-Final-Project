"""
Load data into Postgres database
"""

# UTILS
from src.utils.path_utils import path, Path


# DEPENDENCIES
import psycopg2


# MAIN
if __name__ == "__main__":

    # Connections
    conn = psycopg2.connect("dbname=test user=postgres")
