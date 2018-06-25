const express = require('express');
const path = require('path');
const db = require('../database/index');
const dbC = require('../database/cassandra.js');

const app = express();

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public/index.html')));
app.use('/overviewsBundle.js', express.static(path.join(__dirname, '../public/dist/bundle.js')));
app.use('/images/star-rating.png', express.static(path.join(__dirname, '../public/images/star-rating.png')));

app.get('/overviews/restaurant/:restaurantId/overview', (req, res) => {
  db.retrieve(req.params.restaurantId, (err, results) => {
    if (err && err.message.includes('Cast to number failed for value "NaN"')) {
      res.status(400).json('Bad request');
    } else if (err) {
      res.status(500).json('Unable to retrieve overview data from database');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post('/overviews/restaurant/:restaurantId/add', (req, res) => {
  const id = req.url.split('/')[3];
  const tag = 'Good for a date';
  const count = 25;
  console.log(dbC.add());

  dbC.add(id, tag, count)
    .then(data => res.send(data.rows))
    .catch(err => res.send(err));
  // res.send(id);
});

app.put('/overviews/restaurant/:restaurantId/change', (req, res) => {
  res.send('response for put request');
});

app.delete('/overviews/restaurant/:restaurantId/delete', (req, res) => {
  res.send('response for delete request');
});

module.exports = app;
