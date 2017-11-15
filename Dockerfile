FROM node:7.10.0

RUN mkdir /app

WORKDIR /app

ENV PATH="/usr/local/lib/node_modules/calculator-js/node_modules/.bin/:${PATH}"

ADD package.json /app/

RUN npm install -g

ADD . /app

CMD ["npm", "start"]
