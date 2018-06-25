const express = require('express');
const path = require('path');
// const db = require('../database/index');
const db = require('../database/cassandra.js');

const app = express();

let restaurantIdCount = 10000000;

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public/index.html')));
app.use('/overviewsBundle.js', express.static(path.join(__dirname, '../public/dist/bundle.js')));
app.use('/images/star-rating.png', express.static(path.join(__dirname, '../public/images/star-rating.png')));

app.get('/overviews/restaurant/:restaurantId/overview', (req, res) => {
  let id = req.url.split('/')[3];
  db.find(id).then(data => res.send(data.rows)).catch(err => res.send(err));

  // original code from anoop!!
  // db.retrieve(req.params.restaurantId, (err, results) => {
  //   if (err && err.message.includes('Cast to number failed for value "NaN"')) {
  //     res.status(400).json('Bad request');
  //   } else if (err) {
  //     res.status(500).json('Unable to retrieve overview data from database');
  //   } else {
  //     res.status(200).json(results);
  //   }
  // });
});

app.post('/overviews/restaurant/:restaurantId/overview', (req, res) => {
  db.add(restaurantIdCount + 1)
    .then((data) => {
      restaurantIdCount += 1;
      console.log(restaurantIdCount, 'added id');
      res.send(data);
    });
  // res.send('response for post request');
});

app.put('/overviews/restaurant/:restaurantId/overview', (req, res) => {
  let id = req.url.split('/')[3];
  let tag = 'Good for a Date';
  let count = 25;

  db.change(id, tag, count)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.delete('/overviews/restaurant/:restaurantId/overview', (req, res) => {
  db.del(restaurantIdCount)
    .then((data) => {
      console.log(restaurantIdCount, 'deleted id');
      restaurantIdCount --; 
      res.send(data);
    })
    .catch(err => res.send(err));
});

module.exports = app;
