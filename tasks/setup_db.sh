#/!bin/bash
initdb "./db"
export PGPORT=8888
export PGHOST=/tmp
pg_ctl -D "./db" -o "-k /tmp" start
createdb "CSE412"
