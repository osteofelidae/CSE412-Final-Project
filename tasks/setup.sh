#!/bin/bash

# Activate venv
source .venv/bin/activate

# Set Python path
export PYTHONPATH="."

# Set Postgres stuff
export PGPORT=5432
export PGHOST=/tmp
