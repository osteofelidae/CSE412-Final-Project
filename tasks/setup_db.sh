#/!bin/bash
initdb "./db"
export PGPORT=5432
export PGHOST=/tmp
pg_ctl -D "./db" -o "-k /tmp" start
createdb "CSE412"
