var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Trip = mongoose.model('Trip');

/* HOME */
router.get('/', function(req, res) {
  res.render('index', { title: 'Travlr Getaways' });
});

/* TRAVEL - dynamic */
router.get('/travel', async function(req, res, next) {
  try {
    const trips = await Trip.find({}).exec();
    res.render('travel', {
      title: 'Travel',
      trips: trips
    });
  } catch (err) {
    next(err);
  }
});

/* NEWS */
router.get('/news', function(req, res) {
  res.render('news', { title: 'News' });
});

/* RESERVATIONS */
router.get('/reservations', function(req, res) {
  res.render('reservations', { title: 'Reservations' });
});

/* ADMIN */
router.get('/admin', function(req, res) {
  res.render('admin', { title: 'Admin' });
});

/* LOGIN */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login' });
});

module.exports = router;