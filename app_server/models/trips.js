const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  resort: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

mongoose.model('Trip', tripSchema);
