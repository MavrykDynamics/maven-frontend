FROM node:18.0.0

COPY package.json .

RUN npm install

ENV PORT 3002

ENV API_MEDIUM -----HERE API KEY ----

COPY . .

EXPOSE $PORT

CMD [ "node", "node-server.js"]