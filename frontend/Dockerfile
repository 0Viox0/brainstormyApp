FROM node:20-alpine AS builder

ARG VITE_BASE_URL=http://localhost:3000
ARG VITE_PROMPT_MAX_SYMBOLS=250

ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_PROMPT_MAX_SYMBOLS=250

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
