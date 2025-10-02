# NGPKF Boilerplate

## Overview

This project serves as a boilerplate for building scalable backend applications using the following technologies:

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **GraphQL**: A query language for APIs that enables flexible and efficient data fetching.
- **Kafka**: A distributed event streaming platform used for real-time data processing.
- **PostgreSQL**: A powerful, open-source relational database.
- **Firebase (Pub/Sub)**: A messaging service for asynchronous event-driven architectures.

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the Repository

```sh
git clone <repository_url>
cd <project_name>
```

### 2. Environment Variables

Copy the sample environment file and configure the required environment variables:

```sh
cp .env.sample .env
```

Then, update the `.env` file with the necessary values.

## Running the Application

For development:

```sh
npm run app:start:dev
```

For production:

```sh
npm run app:start:prod
```

This will start the NestJS app along with Kafka, PostgreSQL, and Firebase Pub/Sub.

### 4. Access the Services

- **GraphQL Playground**: `http://localhost:3000/graphql`
- **PostgreSQL**: Accessible via `localhost:5432`
- **Kafka**: Running on `localhost:9092`
- **Firebase Pub/Sub**: Integrated within the NestJS app

### 5. Stopping the Services

To stop the running containers:

```sh
npm run app:stop:dev
```

For production:

```sh
npm run app:stop:prod
```

### 6.Running Database Migrations

Create a new migration:

```sh
npm run db:migrate:create
```

Apply pending migrations:

```sh
npm run db:migrate:up
```
