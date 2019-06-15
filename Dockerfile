FROM node:10.15-alpine

RUN mkdir -p /src/module

WORKDIR /src/module

COPY . /src/module

RUN npm install

EXPOSE 3010

CMD [ "npm", "run", "start" ]
