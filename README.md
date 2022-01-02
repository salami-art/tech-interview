# User API

## Server Side 

cd into the `api` folder

install dependencies:

`V=1 yarn install`

create db and seed data:

```
knex migrate:latest
knex seed:run
```

run project

`yarn dev`

run tests

`yarn test`

visit API documentation

`localhost:3001/api-docs`

## Client

cd into the `webapp` folder

run `yarn start`

visit `http://localhost:3000`