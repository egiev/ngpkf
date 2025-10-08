# NGPKF

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-0.0.1-blue)
![License: MIT](https://img.shields.io/badge/license-MIT-yellow)

## What is NGPKF?

**NGPKF** is a modern, scalable backend boilerplate built with [NestJS](https://nestjs.com/), GraphQL (including GraphQL Federation), Kafka, PostgreSQL, and AdminJS. It provides a robust foundation for event-driven, microservice-ready Node.js applications, featuring:

- **NestJS** for modular, maintainable server-side code
- **GraphQL** for flexible API development
- **GraphQL Federation** for composing multiple GraphQL services into a unified API
- **Kafka** for distributed event streaming
- **PostgreSQL** for relational data storage
- **AdminJS** for instant admin panel
- **MikroORM** for data access
- **Docker** for easy local and production deployment

---

## Why use NGPKF?

**Key Features & Benefits:**

- Rapid project bootstrap for scalable Node.js backends
- First-class GraphQL API support (including GraphQL Federation)
- Built-in support for microservices and event-driven architecture
- Out-of-the-box Docker Compose for local and prod environments
- CLI utilities for user and topic management
- Integrated admin panel (AdminJS)
- Secure authentication with JWT
- Code quality enforced by ESLint, Prettier, Husky, and Commitlint
- Ready for CI/CD and cloud deployment

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local scripts)

### 1. Clone the Repository

```sh
git clone <repository_url>
cd ngpkf
```

### 2. Configure Environment Variables

Copy the sample environment file and fill in your values:

```sh
# For local environment
cp .env.sample .env.local

# For development environment
cp .env.sample .env.dev

# For production environment
cp .env.sample .env.prod
```

### 3. Start the Application

#### Local Development

```sh
npm run app:start:local
```

#### Development

```sh
npm run app:start:dev
```

#### Production

```sh
npm run app:start:prod
```

### 4. Accessing Services

- **API (GraphQL Playground):** [http://localhost:3000/graphql](http://localhost:3000/graphql)
- **GraphQL Federation Gateway:** [http://localhost:3000/federation](http://localhost:3000/federation) _(if enabled)_
- **Admin Panel:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **PostgreSQL:** `localhost:5432`
- **Kafka:** `localhost:9092`

### 5. Stopping the Application

```sh
# For local
npm run app:stop:local
# For development
npm run app:stop:dev
# For production
npm run app:stop:prod
```

### 6. Database Migrations

Create a new migration:

```sh
npm run db:migrate:create
```

Apply migrations:

```sh
npm run db:migrate:up
```

### 7. Running Tests

```sh
npm test
```

---

## Usage Examples

### Run CLI Commands

Create a super user via CLI:

```sh
npm run app:start:local:cli -- user:create -u <email> -p <password> --super-user
```

---

## Support & Documentation

- For issues, use the repository [issue tracker](../../issues)
- For contributing, see [CONTRIBUTING.md](docs/CONTRIBUTING.md) (if available)
- For license details, see [LICENSE](LICENSE)

---

## Maintainers & Contributing

- **Maintainer:** Reginald Mabanta
- **License:** [MIT](LICENSE)
- **Contributions:** Welcome! Please see `CONTRIBUTING.md` for guidelines (if available).

---

## Project Structure

```
├── src/
│   ├── apis/           # API modules (HTTP, Kafka)
│   ├── command/        # CLI commands
│   ├── common/         # Shared modules/utilities
│   ├── config/         # Configuration
│   ├── infra/          # Infrastructure (db, kafka, admin)
│   ├── modules/        # Business logic modules
│   └── main.ts         # App entrypoint
├── test/               # Tests
├── Dockerfile          # Docker build
├── docker-compose.*    # Docker Compose configs
├── .env.sample         # Example environment
└── ...
```

---

## Acknowledgements

Built with [NestJS](https://nestjs.com/), [KafkaJS](https://kafka.js.org/), [MikroORM](https://mikro-orm.io/), [AdminJS](https://adminjs.co/), and the open source community.
