# Development Stage
FROM node:22.14.0-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Build Stage (Production Build)
FROM node:22.14.0-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
ENV HUSKY=0
RUN npm run build
RUN npm ci && npm cache clean --force
USER node

# Production Stage
FROM node:22.14.0-alpine AS production
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY tsconfig.json ./
COPY package.json ./
EXPOSE 3000
CMD node dist/cli.js kafka:create-topics && node dist/main.js
