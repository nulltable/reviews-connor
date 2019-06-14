const mysql = require('mysql');
const util = require('util');
const squel = require('squel');
const dbconf = require('./config/db_config.js');

module.exports.getSummary = (restaurantId, callback) => {
  const pool = mysql.createPool({
    connectionLimit: 100,
    timeout: 1000000,
    acquireTimeout: 30000,
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

    pool.query(sql, callback);
  };

module.exports.getAllReviews = (restaurantId, callback) => {
  const pool = mysql.createPool({
    connectionLimit: 10,
    timeout: 1000000,
    acquireTimeout: 30000,
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

    pool.query(sql, callback);
  };

  module.exports.createReview = (restaurantId, review, callback) => {
    const pool = mysql.createPool({
      connectionLimit: 10,
      timeout: 1000000,
      acquireTimeout: 30000,
      user: dbconf.role,
      host: dbconf.host,
      database: 'reviewsDB',
      password: dbconf.password,
      port: 3306
    });

    const sql = `INSERT INTO reviews (restaurant, diner, text, date, overall, food, service, ambience, wouldrecommend, tags) VALUES (${restaurantId}, ${review.diner}, '${review.text}', '${review.date}', ${review.overall}, ${review.food}, ${review.service}, ${review.ambience}, ${review.wouldrecommend}, '${review.tags}')`;

    pool.query(sql, callback);
  }