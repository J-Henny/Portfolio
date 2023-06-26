#Build frontend static files

FROM node:16.10.0-alpine as frontend

WORKDIR /portfolio/frontend
COPY frontend/package.json /portfolio/frontend
COPY frontend/package-lock.json /portfolio/frontend
RUN npm ci --silent

COPY frontend /portfolio/frontend
RUN npm run build



#Build backend

FROM python:3.9-alpine as base

FROM base as backend

WORKDIR /portfolio
COPY ./backend .
COPY requirements.txt /portfolio
RUN python -m pip install -r requirements.txt

RUN python backend/manage.py collectstatic --noinput


# Nginx build

FROM base as final

RUN apt-get install -y nginx

WORKDIR /portfolio
COPY . /portfolio

COPY --from=backend /usr/lib/python3.9/site-packages /usr/lib/python3.9/site-packages
COPY --from=frontend /portfolio/frontend/build /portfolio/frontend/build
COPY --from=backend /portfolio/frontend/build/static /portfolio/frontend/build/static
RUN mv nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD nginx && python -m gunicorn -b unix:/tmp/gunicorn.sock --timeout 600 backend/backend.wsgi






