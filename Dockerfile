FROM python:3.9.16 as base

FROM base as backend

WORKDIR /portfolio

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . /portfolio

RUN mkdir -p /didyouseeit/frontend/build/static && \
    yes yes | python3 manage.py collectstatic


FROM node:18.12.1-alpine as frontend

WORKDIR /portfolio/frontend

COPY frontend/package.json frontend/package-lock.json /portfolio/frontend
RUN npm install --legacy-peer-deps

COPY frontend /portfolio/frontend
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

CMD nginx -g "daemon off;" && python -m gunicorn -b unix:/tmp/gunicorn.sock --timeout 600 backend.wsgi
