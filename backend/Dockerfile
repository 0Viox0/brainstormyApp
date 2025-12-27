FROM node:25-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:prod-src"]
