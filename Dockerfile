FROM node:7.10.0

RUN mkdir /app

WORKDIR /app

ADD . /app

RUN npm install

CMD ["npm", "start"]
