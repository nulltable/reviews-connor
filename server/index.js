const path = require('path');
const cors = require('cors');
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

app.post('/:id/summary', (req, res) => {
  db.writeSummary(req.header.data, req.params.id, (err) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

app.put('./:id/summary', (req, res) => {
  db.updateSummary(req.header.data, req.params.id, (err) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
    }
  });
});

app.delete('./:id/summary', (req, res) => {
  db.deleteSummary(req.params.id.data, (err) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.end();
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

app.post('/:id/reviews', (req, res) => {
  db.writeReviews(req.header.data, req.params.id.data, (err) => {
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
  db.updateReviews(req.header.data, req.params.id, (err) => {
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
  db.deleteReviews(req.params.id.data, (err) => {
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
