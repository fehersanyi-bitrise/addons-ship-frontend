FROM ubuntu:latest

COPY . .

# install dependencies
RUN apt-get update -y && \
  apt-get install nodejs -y && \
  apt-get install npm -y && \
  npm i -g yarn -y && \
  yarn install -y

RUN yarn build

# public port
EXPOSE 3000

CMD [ "yarn", "start" ]