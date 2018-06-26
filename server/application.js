const express = require('express');
const path = require('path');
// const db = require('../database/index');
// const db = require('../database/cassandra.js');
const db = require('../database/pgp.js');

const app = express();

// let restaurantIdCount = 10000000;

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public/index.html')));
app.use('/overviewsBundle.js', express.static(path.join(__dirname, '../public/dist/bundle.js')));
app.use('/images/star-rating.png', express.static(path.join(__dirname, '../public/images/star-rating.png')));

app.get('/overviews/restaurant/:restaurantId/overview', (req, res) => {
  const id = req.url.split('/')[3];
  const returnData = {tag:{}, payment:[]};

  db.find(id)
    .then((data) => {
      data.forEach((eachData) => {
        returnData.id = eachData.id;
        returnData.name = eachData.name;
        returnData.description = eachData.description;
        returnData.style_name = eachData.style_name;
        returnData.cuisine_name = eachData.cuisine_name;
        returnData.breakfast_hours = eachData.breakfast_hours;
        returnData.lunch_hours = eachData.lunch_hours;
        returnData.dinner_hours = eachData.dinner_hours;
        returnData.phone_number = eachData.phone_number;
        returnData.dress_code = eachData.dress_code;
        returnData.chef = eachData.chef;
        returnData.lat = eachData.lat;
        returnData.lng = eachData.lng;
        returnData.address = eachData.address;
        returnData.neighborhood = eachData.neighborhood;
        returnData.cross_street = eachData.cross_street;
        returnData.parking = eachData.parking;
        returnData.tag[eachData.tag] = eachData.vote;
        if(!returnData.payment.includes(eachData.payment_option)) {
          returnData.payment.push(eachData.payment_option);
        }
      });
      // console.log(returnData);
      res.send(returnData);
    })
    .catch(err => res.send(err));

  // for cassandra
  // db.find(id).then(data => res.send(data.rows)).catch(err => res.send(err));

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
  db.add([1, 3, 7], [1, 2])
    .then(() => res.send('check db'))
    .catch(err => res.send(err));

  // for cassandra
  // db.add(restaurantIdCount + 1)
  //   .then((data) => {
  //     restaurantIdCount += 1;
  //     console.log(restaurantIdCount, 'added id');
  //     res.send(data);
  //   });
});

app.put('/overviews/restaurant/:restaurantId/overview', (req, res) => {
  const id = req.url.split('/')[3];
  const tag = 'Good for a Date';
  const count = 25;

  db.change(id, tag, count)
    .then(data => res.send(data))
    .catch(err => res.send(err));
});

app.delete('/overviews/restaurant/:restaurantId/overview', (req, res) => {
  db.del(restaurantIdCount)
    .then((data) => {
      console.log(restaurantIdCount, 'deleted id');
      restaurantIdCount--;
      res.send(data);
    })
    .catch(err => res.send(err));
});

module.exports = app;
