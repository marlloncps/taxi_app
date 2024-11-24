FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

FROM node:18 AS production

WORKDIR /app

COPY --from=build /app /app

RUN yarn install

EXPOSE 8080

CMD yarn run dev & yarn run db:seed
