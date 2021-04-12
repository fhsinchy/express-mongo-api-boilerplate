# Solid Express Application Architecture

This is a battle tested application architecture that I've been using for a while now on medium to large projects at work. Although not perfect, so far it has proved itself to be a reliable, scalable and manageable project architecture.

## Structure

Directory structure of this architecture is as follows -

```shell
.
├── docker-compose.yaml
├── LICENSE
├── Makefile
├── README.md
└── src
    ├── app.js
    ├── auth
    │   ├── api
    │   │   ├── index.js
    │   │   └── routes
    │   │       ├── auth.js
    │   │       ├── auth.test.js
    │   │       ├── profile.js
    │   │       └── profile.test.js
    │   ├── middleware
    │   │   ├── authenticate.js
    │   │   └── index.js
    │   ├── models
    │   │   ├── index.js
    │   │   └── User.js
    │   └── services
    │       ├── auth.js
    │       └── index.js
    ├── bin
    │   └── www
    ├── config
    │   ├── app.js
    │   ├── auth.js
    │   ├── cors.js
    │   ├── db.js
    │   ├── index.js
    │   └── seeder.js
    ├── Dockerfile
    ├── Dockerfile.dev
    ├── Dockerfile.test
    ├── jest.config.js
    ├── log
    ├── node_modules
    ├── nodemon.json
    ├── package.json
    ├── package-lock.json
    ├── routes.js
    ├── routes.test.js
    ├── seed.js
    └── seeds
        └── users.js

12 directories, 34 files
```

The top level files and directories are as follows -

```shell
.
├── docker-compose.yaml
├── LICENSE
├── Makefile
├── README.md
└── src

1 directory, 4 files
```

The `src` drectory holds the actual code for the application. The `docker-compose.yaml` file contains service definitions for the `api` and `db` containers. It also comes with definition for a `mongo-express` container for easy management of the database.

File and directory map for the `src` directory is as follows -

```shell
.
├── app.js
├── auth
│   ├── api
│   │   ├── index.js
│   │   └── routes
│   │       ├── auth.js
│   │       ├── auth.test.js
│   │       ├── profile.js
│   │       └── profile.test.js
│   ├── middleware
│   │   ├── authenticate.js
│   │   └── index.js
│   ├── models
│   │   ├── index.js
│   │   └── User.js
│   └── services
│       ├── auth.js
│       └── index.js
├── bin
│   └── www
├── config
│   ├── app.js
│   ├── auth.js
│   ├── cors.js
│   ├── db.js
│   ├── index.js
│   └── seeder.js
├── Dockerfile
├── Dockerfile.dev
├── Dockerfile.test
├── jest.config.js
├── log
├── node_modules
├── nodemon.json
├── package.json
├── package-lock.json
├── routes.js
├── routes.test.js
├── seed.js
└── seeds
    └── users.js

11 directories, 30 files
```

Here `app.js` contains the main express application instance. This `app` instance is exported from this file and can be imported inside other files. The `bin/www` file is responsible for setting up `mongooge` and starting the server.