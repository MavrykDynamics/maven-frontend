FROM node:18.0.0

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "node", "node-server.js"]