const mongoose = require('mongoose');
require('../models/db');
const Trip = mongoose.model('Trip');
const fs = require('fs');
const path = require('path');

const home = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways'
  });
};

const travel = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.render('travel', {
      title: 'Travel',
      trips: trips
    });
  } catch (err) {
    res.status(500).send(err);
  }
};



module.exports = {
  home,
  travel
};
