FROM node:22 AS builder

WORKDIR /app

COPY client/package.json client/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY client/ ./

RUN yarn build

###

FROM node:22-alpine

WORKDIR /app

COPY server/package.json server/yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist /app/dist

ENV NODE_ENV=production

EXPOSE 8081

CMD ["node", "server"]

