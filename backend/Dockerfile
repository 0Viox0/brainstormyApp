FROM node:25-alpine3.22 AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:prod-src"]
