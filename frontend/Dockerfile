#syntax=docker/dockerfile:1

FROM node:14 as build

WORKDIR /frontend

COPY package*.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
