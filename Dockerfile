
FROM python:3.9.16 as base

RUN apt-get update

FROM base as backend

RUN apt-get install -y --no-install-recommends gcc libc-dev

WORKDIR /portfolio

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /portfolio/frontend/build/static
RUN python /portfolio/backend/manage.py collectstatic --noinput


FROM node:18.12.1-alpine as frontend

WORKDIR /portfolio/frontend

COPY frontend/package.json .
COPY frontend/package-lock.json .
RUN npm install --legacy-peer-deps

COPY frontend/ .
RUN npm run build


FROM base as final

RUN apt-get install -y nginx

WORKDIR /portfolio
COPY . /portfolio

COPY --from=frontend /portfolio/frontend/build /usr/share/nginx/html
COPY --from=backend /portfolio/nginx.conf /etc/nginx/nginx.conf
COPY --from=backend /portfolio/frontend/build/static /portfolio/frontend/build/static

RUN mv nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD nginx && python -m gunicorn -b unix:/tmp/gunicorn.sock --timeout 600 backend.wsgi