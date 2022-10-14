FROM node:17-alpine3.14

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

ENV NODE_ENV=production

COPY . .
RUN npm run build

ARG API_PORT=80
ENV API_PORT=$API_PORT
EXPOSE $API_PORT

USER node
CMD node ./dist/index.js
