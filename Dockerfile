FROM node:22-alpine


WORKDIR /app

COPY package.json /app

RUN npm install

RUN cd client && npm install

RUN npm run build

