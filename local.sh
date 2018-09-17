#bin/sh

cd laradock
docker-compose exec workspace composer install
docker-compose exec workspace php artisan migrate
docker-compose exec workspace php artisan cache:clear
docker-compose exec workspace php artisan config:cache
docker-compose exec workspace php artisan route:cache
docker-compose exec workspace php artisan view:clear
