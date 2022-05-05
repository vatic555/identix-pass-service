FROM mhart/alpine-node:14 AS build
WORKDIR /usr/src/app

RUN apk --no-cache add bash git && rm -rf /var/cache/apk/*

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn install

COPY src ./src
COPY assets ./assets
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.build.json ./tsconfig.build.json
COPY tsconfig.spec.json ./tsconfig.spec.json
COPY jest.config.js ./jest.config.js
COPY jest-e2e.js ./jest-e2e.js
COPY nest-cli.json ./nest-cli.json
COPY .eslintrc.json ./.eslintrc.json
COPY ormconfig.js ./ormconfig.js

RUN yarn build

CMD ["yarn","start"]
