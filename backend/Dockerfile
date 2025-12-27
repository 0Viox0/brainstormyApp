FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

RUN echo "=== Build output ===" && \
    find /app/dist -type f -name "*.js" | head -20 && \
    echo "=== Total JS files: ===" && \
    find /app/dist -type f -name "*.js" | wc -l

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --ignore-scripts

COPY --from=builder /app/prisma ./prisma

RUN echo "=== Before copying dist ===" && \
    ls -la /app

COPY --from=builder /app/dist ./dist

RUN echo "=== Final app structure ===" && \
    ls -la /app && \
    echo "=== dist contents ===" && \
    ls -la /app/dist && \
    echo "=== Looking for main.js ===" && \
    find /app/dist -name "main.js" -o -name "main.*"


EXPOSE 3000

CMD ["node", "dist/src/main"]
