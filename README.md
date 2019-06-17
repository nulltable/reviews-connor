# Reviews and Impressions Module	

 > This module is part of the FreeSeats restaurant reservation app. It displays data relevant to the customer experience overall, as well as renders every review for that restaurant.	
 ## Related Modules	

 ## Table of Contents	

1. [Usage](#Usage)	
1. [Requirements](#requirements)	
1. [Development](#development)	
1. [API](#api)	

 ## Usage	

 ### Node	

> Install the necessary dependencies for this module (npm install)	
> Transpile and bundle all the components (webpack)	
> If it's your first time downloading the repo, [seed the database](#postgresql)	
> Start the server (npm run sever-dev)	
> The public folder will be available at localhost port 3010	

 ## Requirements	

 An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).	

- Node 6.13.0	
- MySQL 5.7

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

### Data Generation and Seeding (10m restaurants)
Generate CSV Data:
  - npm run write-diners
  - npm run write-restaurants
  - npm run write-reviews (run 5 times while changing i and id in file)
  - npm run write-reports

Seed MySQL Database (replace {data} and path):
  - Run schema file in MySQL shell
  - Run following command inside MySQL shell for each table (diners, reviews x 5, restaurants, reports)
  - LOAD DATA LOCAL INFILE 'reviews.csv' 
    INTO TABLE reviews
    FIELDS TERMINATED BY ',' 
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES;
  - Index foreign keys by running:
          ALTER TABLE reviews ADD INDEX (restaurant);
          ALTER TABLE reviews ADD INDEX (diner);
          ALTER TABLE reports ADD INDEX (review);

On EC2:
  - sudo yum install mysql-server
  - sudo /sbin/service mysqld start
  - sudo /usr/bin/mysql_secure_installation
  - Generate CSV files locally
  - Load schema file with mysql -u root -p < schema.sql

SET autocommit=0;
SET unique_checks=0;
SET foreign_key_checks=0;
SET GLOBAL innodb_flush_log_at_trx_commit = 2;
SET GLOBAL innodb_thread_concurrency=8;
SET GLOBAL innodb_support_xa=0;

binlog_cache_size=32768
innodb_buffer_pool_size=68451041
innodb_file_per_table=1
innodb_log_buffer_size=8388608
innodb_log_file_size=134217728
key_buffer_size=16777216
max_binlog_size=134217728
max_connections=8
read_buffer_size=262144
max_md_buffer_size=524288
thread_stack=196608


  - Send Each File: 
    - sudo scp -i /Users/connorhoman/Desktop/SDC.pem reviews.csv.zip ec2-user@18.225.11.255:~/reviews.csv.zip
  - Load Each File: 
    - LOAD DATA LOCAL INFILE 'reviews.csv' 
      INTO TABLE reviews
      FIELDS TERMINATED BY ',' 
      LINES TERMINATED BY '\n'
      IGNORE 1 LINES;
  - Index foreign keys by running:
    ALTER TABLE reviews ADD INDEX (restaurant);
    ALTER TABLE reviews ADD INDEX (diner);  
    ALTER TABLE reports ADD INDEX (review);

 ## API

 ### Reviews Summary	

 #### HTTP request	

 GET http://localhost:3010/:id/summary	

 ##### Parameters	
**restaurant id**  	

 The **restaurant id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.	

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
  "averageService": **_string_**,
  "capacity": **_integer_**  	
}  	

 ### Restaurant Reviews	

 #### HTTP Request	

 POST http://localhost:3010/:id/reviews	

 ##### Parameters 	
**review,**	
**restaurant id,**	
**user id,**  	

The **restaurant** specifies the unique id of the restaurant being queried. 	
The **user** specifires the unique id of the user being queried. 	
The **review** parameter should be an object of the following structure:	

 ##### Response	

 If successful, this method:	
1) pushes user and restaurant into respective tables (if they do not exist)	
2) pushes the review object into an array containing objects with the following structure:	

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
**restaurant id**   	

 The **restaurant id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.	

 ##### Response	

 If successful, this method returns an array containing objects with the previously listed structure.	

 #### HTTP Request	

 PUT http://localhost:3010/:id/reviews	

 ##### Parameters	
**review id,**	
**review**  	

 The **review id** parameter specifies the unique id of the review being queried. 	
The **review** parameter should be an object with of the previously listed structure:	

 ##### Response	

 If successful, this method updates an object in the reviews array to contain the new review data.	


 #### HTTP Request	

 DELETE http://localhost:3010/:id/reviews	

 ##### Parameters	
**review id**  	

 The **review id** parameter specifies the unique id of the restaurant being queried. Seeded test values range from 1-5.	

 ##### Response	

 If successful, this method deletes an object in the reviews array at a the given id.
