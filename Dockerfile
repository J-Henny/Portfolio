
FROM python:3.9.16 as backend

WORKDIR /portfolio

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /portfolio/frontend/build/static
RUN yes yes | python manage.py collectstatic


FROM node:18.12.1-alpine as frontend

WORKDIR /portfolio/frontend

COPY frontend/package.json .
COPY frontend/package-lock.json .
RUN npm ci --silent

COPY frontend/ .
RUN npm run build


FROM nginx:latest

COPY --from=frontend /portfolio/frontend/build /usr/share/nginx/html
COPY --from=backend /portfolio/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
