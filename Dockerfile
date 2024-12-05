FROM node:22

WORKDIR /app

COPY package.json /app

COPY client/package.json /app/client/package.json

RUN npm install && npm run install:client

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
