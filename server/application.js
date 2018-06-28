const express = require('express');
const Promise = require('bluebird');
const path = require('path');
const redis = require('redis');
// const db = require('../database/index');
// const db = require('../database/cassandra.js');
const db = require('../database/pgp.js');
Promise.promisifyAll(redis);
const client = redis.createClient();

const app = express();

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public')));
// app.use('/overviewsBundle.js', express.static(path.join(__dirname, '../public/dist/bundle.js')));
// app.use('/images/star-rating.png', express.static(path.join(__dirname, '../public/images/star-rating.png')));

app.get('/restaurant/:restaurantId/overview', (req, res) => {
  const id = req.url.split('/')[2];
  const returnData = {
 tags: [], payment_options: [], hours_of_operation: {}, location: {} 
};
  const tag = {};
  client.getAsync(id).then((data) => {
    if(data) {
      res.send(data);
    } else {
      db.find(id)
        .then((data) => {
          returnData.rest_id = data[0].id;
          returnData.rest_name = data[0].name.trim();
          returnData.description = data[0].description.trim();
          returnData.dining_style = data[0].style_name.trim();
          returnData.cuisine = data[0].cuisine_name.trim();
          returnData.hours_of_operation.breakfast = data[0].breakfast_hours.trim();
          returnData.hours_of_operation.lunch = data[0].lunch_hours.trim();
          returnData.hours_of_operation.dinner = data[0].dinner_hours.trim();
          returnData.website = data[0].website.trim();
          returnData.phone_number = data[0].phone_number.trim();
          returnData.dress_code = data[0].dress_code.trim();
          returnData.executive_chef = data[0].chef.trim();
          returnData.location.lat = Number(data[0].lat);
          returnData.location.lng = Number(data[0].lng);
          returnData.address = data[0].address.trim();
          returnData.neighborhood = data[0].neighborhood.trim();
          returnData.cross_street = data[0].cross_street.trim();
          returnData.parking_details = data[0].parking.trim();
          returnData.public_transit = data[0].public_transit.trim();
          returnData.price_range = '$31 to $50';
          data.forEach((eachData) => {
            tag[eachData.tag.trim()] = eachData.vote;
            if (!returnData.payment_options.includes(eachData.payment_option.trim())) {
              returnData.payment_options.push(eachData.payment_option.trim());
            }
          });
          returnData.payment_options = returnData.payment_options.join(', ');
          for (const key in tag) {
            returnData.tags.push({ tagName: key, voteCount: tag[key] });
          }
          // console.log('from db');
          client.set(`${id}`, JSON.stringify(returnData), 'EX', 300);

          res.send(returnData);
        })
        .catch(err => res.send(err));
    }
  });

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

app.post('/restaurant/:restaurantId/overview', (req, res) => {
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

app.put('/restaurant/:restaurantId/overview', (req, res) => {
  const id = req.url.split('/')[2];
  const tag = 'Casual';
  const count = 666;

  db.change(id, tag, count)
    .then(() => res.send(`check ${id}`))
    .catch(err => res.send(err));

  // for cassandra
  // db.change(id, tag, count)
  //   .then(data => res.send(data))
  //   .catch(err => res.send(err));
});

app.delete('/restaurant/:restaurantId/overview', (req, res) => {
  db.del().then(() => res.send('the last restaurant deleted')).catch(err => res.send(err));

  // for cassandra
  // db.del(restaurantIdCount)
  //   .then((data) => {
  //     console.log(restaurantIdCount, 'deleted id');
  //     restaurantIdCount--;
  //     res.send(data);
  //   })
  //   .catch(err => res.send(err));
});

module.exports = app;
