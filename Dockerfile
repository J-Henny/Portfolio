FROM node:18-bullseye-slim as node-builder

WORKDIR /Portfolio/frontend
COPY frontend/package.json frontend/package-lock.json /Portfolio/frontend/
RUN npm install

COPY frontend /Portfolio/frontend
RUN npm run build

FROM base as final

RUN apt-get install -y nginx

WORKDIR /Portfolio
COPY . /Portfolio
COPY --from=python-builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=node-builder /Portfolio/frontend/build /Portfolio/frontend/build
COPY --from=python-builder /Portfolio/frontend/build/static /Portfolio/frontend/build/static
RUN mv nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD nginx && python3 -m gunicorn -b unix:/tmp/gunicorn.sock --timeout 600 Portfolio.wsgi