## Description

This backend project is built using:

NestJS
TypeScript
Node.js
Prisma

It provides a REST API for a task list web application, handling data management, business logic, and database interaction.

## Project setup

```bash
$ npm install
```

## Environment variables

Create a .env file in the root directory based on the example:
cp .env.example .env

Then fill in the required values.

Example variables:

DATABASE_URL — PostgreSQL connection string
JWT_SECRET — secret key for JWT authentication(any string)
PORT — server port
DOMAIN — application domain

## Compile and run the project

```bash
# development
$ npm run start:dev

# standard start
$ npm run start

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

NestJS Docs — https://docs.nestjs.com

TypeScript — https://www.typescriptlang.org/
