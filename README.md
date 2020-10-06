# Init project
**install node dependences**
`npm install`
**install composer dependences**
`composer install` 
**Create database**
`symfony console doctrine:database:create` 
**Load entites**
`symfony console doctrine:migrations:migrate` 
**Load fixtures**
`symfony console doctrine:fixtures:load` 
**Edit .env**
`API_URL="'LOCAL IP'"` 
**Build node**
`npm run dev / npm run build` 
**Start server**
`symfony local:server:start --allow-http` 