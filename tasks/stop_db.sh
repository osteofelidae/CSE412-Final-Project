#!/bin/bash
pg_ctl -D "./db" -o "-k /tmp" stop
