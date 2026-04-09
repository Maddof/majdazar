# TanStack Start - Basic Example

This is the basic TanStack Start example, demonstrating the fundamentals of building applications with TanStack Router and TanStack Start.

- [TanStack Router Docs](https://tanstack.com/router)

It's deployed automagically with Netlify!

- [Netlify](https://netlify.com/)

## Start a new project based on this example

To start a new project based on this example, run:

```sh
npx gitpick TanStack/router/tree/main/examples/react/start-basic start-basic
```

## Getting Started

From your terminal:

```sh
npm install
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Build

To build the app for production:

```sh
npm run build
```

## Strapi (PostgreSQL)

This repository now includes a Strapi app in `strapi/` configured for PostgreSQL.

Database settings are in `strapi/.env`:

- `DATABASE_CLIENT=postgres`
- `DATABASE_HOST=localhost`
- `DATABASE_PORT=5432`
- `DATABASE_NAME=portfolio`
- `DATABASE_USERNAME=majd`
- `DATABASE_SSL=false`

Run Strapi from the repository root:

```sh
npm run strapi:dev
```

Other useful commands:

```sh
npm run strapi:build
npm run strapi:start
```
