FROM mysql:latest

RUN mkdir -p /docker-entrypoint-initdb.d

COPY ./schema.sql /docker-entrypoint-initdb.d/schema.sql

EXPOSE 5432