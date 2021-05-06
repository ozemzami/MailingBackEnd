#!/bin/bash
set -e

SERVER="postgresql";
PW="userpassword";
DB="postgres";
USER="user"

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(sudo docker kill $SERVER || :) && \
  (sudo docker rm $SERVER || :) && \
  sudo docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -e POSTGRES_USER=$USER \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
sleep 3;
