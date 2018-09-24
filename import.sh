#bin/sh

cd laradock
cp ../hammocks/dump/$1 .
docker-compose exec mysql mysql -uroot -p hammocks -e"$(cat $1)"
rm -rf $1
