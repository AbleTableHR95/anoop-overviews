const mongoose = require('mongoose');

const mongoURL = process.env.mongoURL || 'mongodb://localhost/cavatable_overviews';

mongoose.connect(mongoURL);

const overviewSchema = new mongoose.Schema({
  rest_id: Number,
  rest_name: String,
  price_range: String,
  description: String,
  dining_style: String,
  cuisine: String,
  hours_of_operation: {
    breakfast: String,
    lunch: String,
    dinner: String,
  },
  phone_number: String,
  website: String,
  payment_options: String,
  dress_code: String,
  executive_chef: String,
  location: {
    lat: Number,
    lng: Number,
  },
  address: String,
  neighborhood: String,
  cross_street: String,
  parking_details: String,
  public_transit: String,
  tags: [{ tagName: String, voteCount: Number }],
});

const OverviewModel = mongoose.model('overviews', overviewSchema);

OverviewModel.count((err, count) => {
  if (err) {
    console.log(err, 'error during counting mock data');
  }
  if (!count) {
    OverviewModel.insertMany(data, (err) => {
      if (err) {
        console.log(err, 'error during building mock data');
      }
    });
  }
});

const retrieve = (restaurantId, handleResponse) => {
  OverviewModel.find({ rest_id: parseInt(restaurantId, 10) })
    .then(results => handleResponse(null, results))
    .catch(err => handleResponse(err, null));
};

module.exports = {
  retrieve,
}
