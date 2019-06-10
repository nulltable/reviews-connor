const mysql = require('mysql');
const squel = require('squel');
const dbconf = require('../config/db_config.js');

module.exports.getSummary = (restaurantId, callback) => {
  const connection = mysql.createConnection({
    user: dbconf.role,
    host: dbconf.host,
    database: 'reviewsDB',
    password: dbconf.password,
    port: 3306
  });
  const sql = squel.select()
    .from('restaurants')
    .field('restaurants.location')
    .field('restaurants.noise')
    .field('restaurants.recommendpercent', 'recommendPercent')
    .field('restaurants.valuerating', 'valueRating')
    .field('restaurants.averageoverall', 'averageOverall')
    .field('restaurants.averagefood', 'averageFood')
    .field('restaurants.averageambience', 'averageAmbience')
    .field('restaurants.averageservice', 'averageService')
    .where(`id = ${restaurantId}`)
    .toString();

  connection.query(sql, callback);
};

module.exports.getAllReviews = (restaurantId, callback) => {
  const connection = mysql.createConnection({
    user: dbconf.role,
    host: dbconf.host,
    database: 'reviewsDB',
    password: dbconf.password,
    port: 3306
  });
  const sql = `SELECT 
    reviews.id, 
    reviews.restaurant,
    reviews.text,
    reviews.date,
    reviews.overall,
    reviews.food,
    reviews.service,
    reviews.ambience,
    reviews.wouldrecommend,
    reviews.tags,
    diners.firstname,
    diners.lastname,
    diners.city,
    diners.avatarcolor,
    diners.isvip,
    diners.totalreviews
    from reviews INNER JOIN diners 
    on (reviews.diner = diners.id) 
    where reviews.restaurant = ${restaurantId}`;

  connection.query(sql, callback);
};
