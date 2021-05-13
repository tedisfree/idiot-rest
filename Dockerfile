FROM node

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV LANGUAGE=C.UTF-8

WORKDIR /usr/local

COPY package.json app.js /usr/local/
COPY bin /usr/local/bin
COPY handlers /usr/local/handlers
COPY private /usr/local/private
COPY public /usr/local/public
COPY routes /usr/local/routes

RUN npm config set strict-ssl false
RUN npm install

EXPOSE 3000