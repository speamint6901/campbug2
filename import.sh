#bin/sh

cd laradock
cp ../hammocks/dump/$1.sql .
docker-compose exec mysql mysql -uroot -p hammocks -e"$(cat $1.sql)"
rm -rf $1.sql
