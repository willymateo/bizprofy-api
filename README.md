# bizprofy-api

Bizprofy Restful API

## Environment variables

You must have a `.env` file in the `root` of the proyect. The `.env` file must have the content of [.env.template](https://github.com/willymateo/bizprofy-api/blob/main/.env.template)

**Note**: Ask to an admin for the value of environment variables.

## Setup

### Development

#### Create the image

```cmd
docker compose -f docker/development/compose.yml build
```

#### Create and start the container

```cmd
docker compose -f docker/development/compose.yml up
```

### Production

#### Create the image

```cmd
docker compose -f docker/production/compose.yml build
```

#### Create and start the container

```cmd
docker compose -f docker/production/compose.yml up
```
