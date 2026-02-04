var express = require('express');
var router = express.Router();

var tripsController = require('../controllers/trips');

// GET all trips
router.get('/trips', tripsController.tripsList);

// GET a single trip by ID
router.get('/trips/:tripid', tripsController.tripsReadOne);

module.exports = router;
