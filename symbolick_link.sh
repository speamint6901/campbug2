#bin/sh

cd laradock
docker-compose exec workspace php artisan storage:link
