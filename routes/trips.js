/**
 * routes/trips.js
 * API routes for Trips (CRUD) + CORS headers for Angular dev server
 *
 * IMPORTANT:
 * This router is expected to be mounted like:
 *   app.use('/api', require('./routes/trips'));
 *
 * So endpoints become:
 *   GET    /api/trips
 *   GET    /api/trips/:tripId
 *   POST   /api/trips
 *   PUT    /api/trips/:tripId
 *   DELETE /api/trips/:tripId
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Uses the Trip model you already registered somewhere in your project
const Trip = mongoose.model('Trip');

/**
 * CORS middleware:
 * Allows your Angular app (http://localhost:4200) to call your API (http://localhost:3000).
 * Handles OPTIONS preflight needed for PUT/DELETE/POST.
 */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // dev-friendly; simplest for localhost
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// GET /api/trips  (get all trips)
router.get('/trips', async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to retrieve trips.',
      error: err?.message ?? err
    });
  }
});

// GET /api/trips/:tripId  (get one trip)
router.get('/trips/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: 'Invalid tripId format.' });
    }

    const trip = await Trip.findById(tripId).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found.' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to retrieve trip.',
      error: err?.message ?? err
    });
  }
});

// POST /api/trips  (create a new trip)
router.post('/trips', async (req, res) => {
  try {
    // Accept either perPerson OR legacy price, but normalize to perPerson for your new schema
    const perPerson = req.body.perPerson ?? req.body.price;

    const newTrip = {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,

      // Store both if you want backwards compatibility with older code
      perPerson: perPerson,
      price: req.body.price ?? perPerson,

      image: req.body.image,
      description: req.body.description
    };

    const created = await Trip.create(newTrip);
    return res.status(201).json(created);
  } catch (err) {
    // Mongoose validation errors should be 400
    if (err?.name === 'ValidationError') {
      return res.status(400).json(err);
    }

    return res.status(500).json({
      message: 'Failed to create trip.',
      error: err?.message ?? err
    });
  }
});

// PUT /api/trips/:tripId  (update an existing trip)
router.put('/trips/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: 'Invalid tripId format.' });
    }

    // Allow partial updates, but normalize perPerson if price was sent
    const perPerson = req.body.perPerson ?? req.body.price;

    const update = {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      image: req.body.image,
      description: req.body.description
    };

    // Only set these if provided
    if (perPerson !== undefined) {
      update.perPerson = perPerson;
      update.price = req.body.price ?? perPerson; // optional backwards compatibility
    }

    // Remove undefined keys so we don't overwrite fields with undefined
    Object.keys(update).forEach((k) => update[k] === undefined && delete update[k]);

    const updated = await Trip.findByIdAndUpdate(tripId, update, {
      new: true,
      runValidators: true
    }).exec();

    if (!updated) {
      return res.status(404).json({ message: 'Trip not found.' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    if (err?.name === 'ValidationError') {
      return res.status(400).json(err);
    }

    return res.status(500).json({
      message: 'Failed to update trip.',
      error: err?.message ?? err
    });
  }
});

// DELETE /api/trips/:tripId  (delete a trip)
router.delete('/trips/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: 'Invalid tripId format.' });
    }

    const deleted = await Trip.findByIdAndDelete(tripId).exec();

    if (!deleted) {
      return res.status(404).json({ message: 'Trip not found.' });
    }

    // 204 = success, no content
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to delete trip.',
      error: err?.message ?? err
    });
  }
});

module.exports = router;
