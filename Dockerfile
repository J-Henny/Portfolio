# Stage 1: Backend build
FROM python:3.9.6-slim-buster as backend

WORKDIR /portfolio

COPY backend/requirements.txt .

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && apt-get install -y --no-install-recommends libpq-dev \
    && pip install --no-cache-dir -r requirements.txt

COPY backend .

# Stage 2: Frontend build
FROM node:16.10.0-alpine as frontend

WORKDIR /portfolio/frontend

COPY frontend/package.json .
COPY frontend/package-lock.json .

RUN npm ci --silent

COPY frontend .

RUN npm run build

# Stage 3: Final image
FROM python:3.9.6-slim-buster

RUN apt-get update \
    && apt-get install -y --no-install-recommends nginx \
    && rm -rf /var/lib/apt/lists/*

COPY --from=backend /portfolio /portfolio
COPY --from=frontend /portfolio/frontend/build /var/www/html

COPY nginx.conf /etc/nginx/sites-available/default

WORKDIR /portfolio/backend

EXPOSE 80

CMD service nginx start && gunicorn backend.wsgi:application --bind 0.0.0.0:8000
