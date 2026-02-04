const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');


// GET /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json(err);
  }
};


// GET /api/trips/:tripid
const tripsReadOne = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripid);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);

  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {
  tripsList,
  tripsReadOne
};
