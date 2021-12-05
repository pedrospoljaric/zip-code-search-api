FROM node:16

WORKDIR /usr/src/api

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm ci

COPY . .

CMD ["/bin/sh", "entrypoint.sh"]
