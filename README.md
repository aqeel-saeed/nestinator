<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Nestinator

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript core project, working as an Incubator for the nest of your project, to be lunched soon as a package to start your project with high level helpers and pre-installed packeges and utils and modules to help your start rapidly.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# run docker image for postgresql
docker-compose up --build

# development mode
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Commands

```bash
# seed data into database
$ npm run seed
```

## TODO List

- [x] password confirmation validation (register dto)
- [ ] sending code with mail (mail service)
- [ ] verifying code when register 
- [ ] reset password code
- [ ] postgres type orm error codes
- [x] is existed custom validator
- [ ] is unique custom validator
- [ ] make generic repositories instead of use it in the services only (find user by email should be a function in the repo, also filtering data and search should be same)
- [ ] even if I am throwing an exception, i got the return apiResponse message
- [ ] permission assign dto
- [ ] permissions controller and service
- [x] generic seeder 
- [x] seeding script
- [x] seeding command
- [x] unify method names in controllers and services for all modules
- [x] rename tables
- [ ] refactor user-address relation (address dto for create and update, addresses service and controller and module)
- [x] add roles module with relations with permissions and users
- [x] add log to the base seeder
- [x] inject permissions in logged in user
- [ ] add permissions guard
- [ ] add params to permissions guard (for update and delete operations)
- [ ] find a good way to attache m2m data when send them in the create and update operations without add them manually
