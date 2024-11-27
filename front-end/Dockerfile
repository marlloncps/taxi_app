FROM node:18

WORKDIR /app-front

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 80

CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "80"]
