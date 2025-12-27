FROM node:25-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:25-alpine3.22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated

EXPOSE 3000

CMD ["npm", "run", "start:prod-src"]
