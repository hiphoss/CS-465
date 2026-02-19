/**
 * routes/trips.js
 * Module 7: Adds JWT authentication (register/login) and secures admin CRUD endpoints.
 *
 * Expected mount:
 *   app.use('/api', require('./routes/trips'));
 *
 * Endpoints:
 *   POST   /api/register
 *   POST   /api/login
 *
 *   GET    /api/trips              (public)
 *   GET    /api/trips/:tripId      (protected)
 *   POST   /api/trips              (protected)
 *   PUT    /api/trips/:tripId      (protected)
 *   DELETE /api/trips/:tripId      (protected)
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

// Ensure User model is registered
require('../models/user');
const User = mongoose.model('User');

// Trip model must already be registered in your app (it is, since /api/trips works)
const Trip = mongoose.model('Trip');

/**
 * CORS middleware for Angular dev server (localhost:4200).
 * Allows Authorization header for JWT and handles OPTIONS preflight.
 */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

/**
 * JWT auth middleware
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: missing token' });
  }

  jwt.verify(token, jwtSecret, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: invalid token' });
    }
    req.user = payload;
    next();
  });
}

/**
 * AUTH: Register (mock admin)
 * POST /api/register
 * Body: { name, email, password }
 */
router.post('/register', async (req, res) => {
  try {
    const name = (req.body.name || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const existing = await User.findOne({ email }).exec();
    if (existing) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const user = new User({
      name: name || email,
      email,
      hash: 'temp',
      salt: 'temp'
    });

    user.setPassword(password);
    await user.save();

    return res.status(201).json({ token: user.generateJwt() });
  } catch (err) {
    return res.status(500).json({
      message: 'Registration failed.',
      error: err?.message ?? err
    });
  }
});

/**
 * AUTH: Login
 * POST /api/login
 * Body: { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email }).exec();
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.status(200).json({ token: user.generateJwt() });
  } catch (err) {
    return res.status(500).json({
      message: 'Login failed.',
      error: err?.message ?? err
    });
  }
});

/**
 * TRIPS: GET all (public)
 * GET /api/trips
 */
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

/**
 * TRIPS: GET one (protected)
 * GET /api/trips/:tripId
 */
router.get('/trips/:tripId', requireAuth, async (req, res) => {
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

/**
 * TRIPS: POST create (protected)
 * POST /api/trips
 */
router.post('/trips', requireAuth, async (req, res) => {
  try {
    const perPerson = req.body.perPerson ?? req.body.price;

    const newTrip = {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: perPerson,
      price: req.body.price ?? perPerson,
      image: req.body.image,
      description: req.body.description
    };

    const created = await Trip.create(newTrip);
    return res.status(201).json(created);
  } catch (err) {
    if (err?.name === 'ValidationError') {
      return res.status(400).json(err);
    }
    return res.status(500).json({
      message: 'Failed to create trip.',
      error: err?.message ?? err
    });
  }
});

/**
 * TRIPS: PUT update (protected)
 * PUT /api/trips/:tripId
 */
router.put('/trips/:tripId', requireAuth, async (req, res) => {
  try {
    const { tripId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: 'Invalid tripId format.' });
    }

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

    if (perPerson !== undefined) {
      update.perPerson = perPerson;
      update.price = req.body.price ?? perPerson;
    }

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

/**
 * TRIPS: DELETE (protected)
 * DELETE /api/trips/:tripId
 */
router.delete('/trips/:tripId', requireAuth, async (req, res) => {
  try {
    const { tripId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: 'Invalid tripId format.' });
    }

    const deleted = await Trip.findByIdAndDelete(tripId).exec();
    if (!deleted) {
      return res.status(404).json({ message: 'Trip not found.' });
    }

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to delete trip.',
      error: err?.message ?? err
    });
  }
});

module.exports = router;
