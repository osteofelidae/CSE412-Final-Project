#!/bin/bash
export PGPORT=8888
export PGHOST=/tmp
pg_ctl -D "./db" -o "-k /tmp" start
