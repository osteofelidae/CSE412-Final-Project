#!/bin/bash

# Activate venv
source .venv/bin/activate

# Set Python path
export PYTHONPATH="."

# Set Postgres stuff
export PGPORT=8888
export PGHOST=/tmp
