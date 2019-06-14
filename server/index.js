const path = require('path');
const cors = require('cors');
const nr = require('newrelic');
const express = require('express');
const db = require('../database/index.js');
const bodyparser = require('body-parser');


const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

// Static page GET

app.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
  }
});

// Summary Route

app.get('/:id/summary', (req, res) => {
  db.getSummary(req.params.id, (err, result) => {
    if (err) {
      console.log('summary', err)
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

// Reviews Route

app.get('/:id/reviews', (req, res) => {
  db.getAllReviews(req.params.id, (err, result) => {
    if (err) {
      console.log('reviews', err)
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

app.post('/:id/reviews', (req, res) => {
  db.createReview(req.params.id, req.body, (err) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

app.put('/:id/reviews', (req, res) => {
  db.updateReview(req.body.review, (err) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

app.delete('/:id/reviews', (req, res) => {
  db.deleteReviews(req.body.review, (err) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

module.exports = app;
