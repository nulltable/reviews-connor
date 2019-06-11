const path = require('path');
const cors = require('cors');
const nr = require('newrelic');
const express = require('express');
const db = require('../database/index.js');

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));

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
      res.status(500);
      res.end();
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
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

app.post('/:id/create', (req, res) => {
  db.createReview(req.header.data.review, req.params.id, req.header.data.userID, (err) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

app.put('./:id/reviews', (req, res) => {
  db.updateReview(req.header.data.review, req.header.data.id, (err) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

app.delete('./:id/reviews', (req, res) => {
  db.deleteReviews(req.header.data.id, (err) => {
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
