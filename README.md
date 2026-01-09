# Galactic Tournament API

The Galactic Tournament API uses an in-memory database, so every time the project is run, the database is restarted. Everything is correctly separated to divide the business logic from the database connections, services, and route exposure.

# The following tools must be installed:

Docker
Node - 22

# For run project:

```bash
npm install
```

```bash
npm start
```

# alternative docker

run docker app

execute this command in the project

```bash
docker-compose up --build
```

localhost:3000


# Galactic Tournament front

For the front end, we have some small atomic design style components to reuse in the app and from there create other larger components such as layouts, which are visual, and the two routes, which are the main and ranking routes in the pages folder, which connect to the services to make requests.

# The following tools must be installed:
Docker
Node - 22
Angular 21

# For run project local:

```bash
npm install
```

```bash
npm start
```

# alternative docker

run docker app

execute this command in the project

```bash
docker-compose up --build
```

localhost:4200
