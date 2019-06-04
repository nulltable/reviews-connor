# Reviews and Impressions Module

> This module is part of the FreeSeats restaurant reservation app. It displays data relevant to the customer experience overall, as well as renders every review for that restaurant.

## Related Modules

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#api)

## Usage

### Docker

> Make sure no images with the names "rdbimg" or "rfeimg", or containers with the names "rdb" or "rfe" exist on the host
> call 'bash compose'
> visit port 3010 on the host IP


### Plain Node

> Install the necessary dependencies for this module (npm install)
> Transpile and bundle all the components (webpack)
> If it's your first time downloading the repo, [seed the database](#postgresql)
> Start the server (npm run sever-dev)
> The public folder will be available at localhost port 3010

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- PostgreSQL 11.2

## Deployment

- When ready to deploy, run webpack without watch mode:
> npm run build
- Start the server:
> npm run start


## Development

### Installing Dependencies

 - Globally:

npm install -g webpack
npm install -g webpack-cli

 - In this repo:

npm install

### PostgreSQL

! If re-seeding, run: dropdb reviews

0) Homebrew is required
  - https://brew.sh
1) Install postgres
  - brew install postgres
2) Start postgres if it is not already started
  - brew services start postgres
3) Run the following commands:
  - createdb reviews
  - $ psql reviews
4) Run the schema file
  - reviews=# \i database/schema.sql
5) Check out the tables
  - reviews=# \dt
6) Exit the psql shell
  - reviews=# \q
7) Go to the config/localRole.example.js file
  - rename to 'localRole.js'
  - make the key equal to your local username or whatever is the username of the postgres role that created the database (run 'select * from pg_roles;' in the psql shell [psql reviews to enter the shell again] to see a list of possibilities)
8) Run the seed script (don't forget npm install)
  - npm run seed
9) Check if the tables populated
  - psql reviews
  - reviews=# select * from reviews;

## API - Postgres

### Reviews Summary

#### HTTP request

POST http://localhost:3010/:id/summary

##### Parameters
**id**  
and
**summary data**  

The **id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.
The **summary data** must be in the following format

##### Response

If successful, this method should write data into the database in the following shape:

{  
  "location": **_string_**,  
  "noise": **_string_**,  
  "recommendPercent": **_integer_**,  
  "valueRating": **_string_**,  
  "averageOverall": **_string_**,  
  "averageFood": **_string_**,  
  "averageAmbience": **_string_**,  
  "averageService": **_string_**  
}  

#### HTTP request

GET http://localhost:3010/:id/summary

##### Parameters
**id**  

The **id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.

##### Response

If successful, this method returns a response body with the following structure:

{  
  "location": **_string_**,  
  "noise": **_string_**,  
  "recommendPercent": **_integer_**,  
  "valueRating": **_string_**,  
  "averageOverall": **_string_**,  
  "averageFood": **_string_**,  
  "averageAmbience": **_string_**,  
  "averageService": **_string_**  
}  
#### HTTP request

UPDATE http://localhost:3010/:id/summary

##### Parameters
**id**  
and 
**summary data**  

The **id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.
The **summary data** must be in the following format

##### Response

If successful, this method will update a review record at a certain ID with the following structure:

{  
  "location": **_string_**,  
  "noise": **_string_**,  
  "recommendPercent": **_integer_**,  
  "valueRating": **_string_**,  
  "averageOverall": **_string_**,  
  "averageFood": **_string_**,  
  "averageAmbience": **_string_**,  
  "averageService": **_string_**  
}  
#### HTTP request

DELETE http://localhost:3010/:id/summary

##### Parameters
**id**  

The **id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.

##### Response

If successful, this method will delete a review at a certain ID


### Restaurant Reviews

#### HTTP Request

CREATE http://localhost:3010/:id/reviews

##### Parameters 
**reviews**  

The **reviews** parameter should be an array with objects of the following structure:

##### Response

If successful, this method creates an array containing objects with the following structure:

{  
  "id": **_integer_**,  
  "restaurant": **_integer_**,  
  "diner": **_integer_**,  
  "text": **_string_**,  
  "date": **_date_**,  
  "overall": **_integer_**,  
  "food": **_integer_**,  
  "service": **_integer_**,  
  "ambience": **_integer_**,  
  "wouldrecommend": **_boolean_**  
  "tags": **_string_**,  
  "firstname": **_string_**,  
  "lastname": **_string_**,  
  "city": **_string_**,  
  "totalreviews": **_integer_**  
}
#### HTTP Request

GET http://localhost:3010/:id/reviews

##### Parameters
**id**   

The **id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.

##### Response

If successful, this method returns an array containing objects with the following structure:

{  
  "id": **_integer_**,  
  "restaurant": **_integer_**,  
  "diner": **_integer_**,  
  "text": **_string_**,  
  "date": **_date_**,  
  "overall": **_integer_**,  
  "food": **_integer_**,  
  "service": **_integer_**,  
  "ambience": **_integer_**,  
  "wouldrecommend": **_boolean_**  
  "tags": **_string_**,  
  "firstname": **_string_**,  
  "lastname": **_string_**,  
  "city": **_string_**,  
  "totalreviews": **_integer_**  
}
#### HTTP Request

UPDATE http://localhost:3010/:id/reviews

##### Parameters
**id**  
**reviews**  

The **id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.
The **reviews** parameter should be an array with objects of the following structure:

##### Response

If successful, this method update an array to contain the objects with the new reviews data.


#### HTTP Request

DELETE http://localhost:3010/:id/reviews

##### Parameters
**id**  

The **id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.

##### Response

If successful, this method deletes an array at a the given id.
