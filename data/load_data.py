"""
Load data into Postgres database
"""

# UTILS
from src.utils.path_utils import path, Path


# DEPENDENCIES
import psycopg2
import os
import pwd


# MAIN
if __name__ == "__main__":

    # Get username
    username = pwd.getpwuid(os.getuid())[0]

    # Connections
    conn = psycopg2.connect(f"dbname=CSE412 user={username}")
    cur = conn.cursor()

    # Execute commands
    with open(path("data/load_data.sql"), "r") as file:
        cur.execute(file.read().replace("$PROJECTPATH", str(path(""))));
