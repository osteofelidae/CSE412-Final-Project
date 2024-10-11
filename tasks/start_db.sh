#!/bin/bash
export PGPORT=5432
export PGHOST=/tmp
pg_ctl -D "./db" -o "-k /tmp" start
