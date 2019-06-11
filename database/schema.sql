CREATE DATABASE reviewsDB;
USE reviewsDB;

CREATE TABLE restaurants (
  id                serial primary key unique,
  name              varchar(30),
  location          varchar(30), 
  noise             varchar(10),
  averageoverall    numeric,
  averageservice    numeric,
  averageambience   numeric,
  averagefood       numeric,
  valuerating       numeric,
  recommendpercent  int,
  capacity          int
);

CREATE TABLE diners (
  id            serial primary key unique NOT NULL,
  firstname     varchar(30),
  lastname      varchar(30),
  city          varchar(30),
  totalreviews  int,
  avatarcolor   varchar(10),
  isvip         boolean
);

CREATE TABLE reviews (
  id              serial primary key unique,
  restaurant      bigint(20) unsigned,
  diner           bigint(20) unsigned,
  text            text,
  date            date,
  overall         int,
  food            int,
  service         int,
  ambience        int,
  wouldrecommend  boolean,
  tags            text,
  foreign key (diner) references diners(id),
  foreign key (restaurant) references restaurants(id)
);

CREATE TABLE reports (
  id            serial primary key unique,
  review        bigint(20) unsigned,
  text          text,
  foreign key (review) references reviews(id)
);
