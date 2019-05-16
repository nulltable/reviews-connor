
CREATE TABLE restaurants (
  id                serial primary key unique,
  location          varchar(30), 
  noise             varchar(10),
  recommendPercent  int,
  valueRating       numeric,
  averageOverall    numeric
);

CREATE TABLE diners (
  id            serial primary key unique,
  firstname     varchar(20),
  lastname      varchar(20),
  totalReviews  int
);

CREATE TABLE reviews (
  id              serial primary key unique,
  restaurant      int,
  diner           int,
  text            varchar(1000),
  date            varchar(30),
  overall         int,
  food            int,
  service         int,
  ambience        int,
  wouldRecommend  bit,
  foreign key (diner) references diners(id),
  foreign key (restaurant) references restaurants(id)
);