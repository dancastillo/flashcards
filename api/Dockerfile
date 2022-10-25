FROM node:18

WORKDIR /api

COPY yarn.lock .
COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4000

RUN yarn build
CMD yarn start