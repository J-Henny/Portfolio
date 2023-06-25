FROM python:3.9.16 as base

FROM base as backend

WORKDIR /portfolio

COPY requirements.txt /portfolio
RUN pip install --no-cache-dir -r requirements.txt

COPY . /portfolio

RUN mkdir -p /portfolio/frontend/build/static && \
    yes yes | python3 /portfolio/backend/manage.py collectstatic


FROM node:18.12.1-alpine as frontend

WORKDIR /portfolio/frontend

COPY frontend/package.json /portfolio/frontend
COPY frontend/package-lock.json /portfolio/frontend
RUN npm install --legacy-peer-deps

COPY frontend /portfolio/frontend
RUN npm run build


FROM tiangolo/uwsgi-nginx:python3.9 as final

COPY --from=frontend /portfolio/frontend/build /usr/share/nginx/html
COPY --from=backend /portfolio/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=backend /portfolio/frontend/build/static /portfolio/frontend/build/static

EXPOSE 80

CMD ["python", "-m", "backend.wsgi"]
