<h3 align="center">
  Express Application for Cardapio-Online project
</h3>

<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

# application in development

## About the project

This api provides a online menu for any bar, restaurant.

This project contains: sending emails, Background jobs, auth JWT
image uploads, injection of dependencies.

## 🚀 Technologies

Technologies that I used to develop this api

  - [Node.js](https://nodejs.org/en/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Express](https://expressjs.com/pt-br/)
  - [tsyringe](https://github.com/microsoft/tsyringe)
  - [TypeORM](https://typeorm.io/#/)
  - [JWT-token](https://jwt.io/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Date-fns](https://date-fns.org/)
  - [Jest](https://jestjs.io/)
  - [SuperTest](https://github.com/visionmedia/supertest)
  - [Eslint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [EditorConfig](https://editorconfig.org/)

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- Instances of [PostgreSQL](https://www.postgresql.org/) or any other SQL database

## 💻 Getting started

**Clone the project and access the folder**

```bash
$ git clone https://github.com/clebim/Cardapio-Online.git && cd Cardapio-Online
```
```bash
# Install the dependencies
$ yarn

# Create the instances of postgreSQL
 - any name to api
 - db_test to database used to tests


# Create the instance of redis

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables in .env and .env.test
# Do not change the NODE_ENV variable in .env.test
# The aws variables do not need to be filled for dev environment
$ cp .env.example .env

# configure ormconfig.json with your settings following ormconfig.exemple.json
$ cp ormconfig.example.json ormconfig.json

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# run command `test` to verify that everything is working correctly
$ yarn test

#run background jobs
$ yarn queue

# To finish, run the api service
$ yarn dev:server


# Well done, project is started!
```

## finished so far
 - login
 - register
 - middleware auth JWT
 - refresh token JWT
 - forgot/reset password
 - sending emails
 - background jobs
