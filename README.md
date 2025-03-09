<p align="center" style="font-size: 100px; font-family: mono">Nestinator</p>

<p align="center">
<?xml version="1.0" encoding="UTF-8"?>
<svg version="1.1" viewBox="0 0 1160 1092" width="290" height="273" xmlns="http://www.w3.org/2000/svg">
<path transform="translate(0)" d="m0 0h1160v1092h-1160z"/>
<path transform="translate(377,328)" d="m0 0 4 1 25 16 18 12 57 37 60 39 32 21 17 11 20 13 26 17 29 19 22 14 27 18 16 10 11 7 13 9 1 4-1 140-5-2-11-8-19-12-55-36-17-11-32-21-17-11-20-13-25-16-18-12-17-11-23-15-17-11-23-15-17-11-23-15-22-14-12-8-4-4z" fill="#ffffff"/>
<path transform="translate(378,525)" d="m0 0 9 6 44 30 13 9 25 17 17 12 11 11 6 9 5 13 2 11v14l-4 16-7 14-10 12-11 8-12 6-12 3h-22l-16-5-13-8-11-10-7-11-5-11-2-7-1-8v-46z" fill="#ffffff"/>
<path transform="translate(682,327)" d="m0 0h11l16 3 16 8 10 8 8 9 8 16 3 10v137l-5-2-18-13-12-8-19-13-32-22-12-8-12-9-10-10-6-10-5-15-1-6v-16l4-17 6-11 7-9 8-8 13-8 11-4z" fill="#ffffff"/>
</svg>

</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript core project, working as an Incubator for the nest of your project, to be lunched soon as a package to start your project with high level helpers and pre-installed packeges and utils and modules to help your start rapidly.

## Project setup

```bash
# install dependencies
$ npm install

# initiat .env file
$ opy .env.example .env
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
- [x] sending code with mail (mail service)
- [x] verifying code when register
- [ ] reset password code
- [ ] postgres type orm error codes
- [x] is existed custom validator
- [ ] is unique custom validator
- [ ] make generic repositories instead of use it in the services only (find user by email should be a function in the repo, also filtering data and search should be same)
- [ ] even if I am throwing an exception, i got the return apiResponse message
- [ ] permission assign dto
- [x] permissions controller and service
- [x] generic seeder
- [x] seeding script
- [x] seeding command
- [x] add admin user seeder
- [x] unify method names in controllers and services for all modules
- [x] rename tables
- [ ] refactor user-address relation (address dto for create and update, addresses service and controller and module)
- [x] add roles module with relations with permissions and users
- [x] add log to the base seeder
- [x] inject permissions in logged in user
- [x] add permissions guard
- [x] add params to permissions guard (for update and delete operations)
- [x] find a good way to attache m2m data when send them in the create and update operations without add them manually
- [x] add soft delete for all entities in a generic entity
- [x] override the delete method in the repository (or modify it in the service) to check if the entity can be soft deleted or not
- [ ] add is_blocked to users
- [ ] restrict blocked and not verified users to log in
- [x] add base repository
- [x] add base service
- [ ] use the entity not found exception in the base service
- [x] add base controller
- [ ] apply a query builder logic in the base repository
- [ ] add query builder options to the base controller
- [x] use base service in all modules
- [x] use base repo in all modules
- [x] use base controller in all modules
- [x] use controllers options in all modules
- [x] find a way to access request user in services of entities which has a relation with user (like post), or inject it in the dto
- [ ] login using gmail
- [ ] login using facebook
- [ ] filtering data dto, pass it in the findAll method (use it in the query builder)
- [x] make apiResponse a method to return a response in the base controller
- [ ] add the status code as a param in the apiResponse method in the base controller (default is 200)
- [x] separate returning response logic into two different methods, one for the success and another for the fail
- [x] apply permissions in a generic way into the base controller so all controller has the permissions decorator by default
- [x] add permissions file into roles and users module
