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
RUN npm run build
RUN npm ci --only=production --ignore-scripts && npm cache clean --force
USER node

# Production Stage
FROM node:22.14.0-alpine AS production
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
EXPOSE 3000
# CMD ["node", "dist/main.js"]
CMD node dist/cli.js kafka:create-topics && node dist/main.js
