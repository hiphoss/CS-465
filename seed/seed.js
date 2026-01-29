const mongoose = require('mongoose');
require('../app_server/models/db');
const Trip = mongoose.model('Trip');

const trips = [
  {
    code: 'B0101',
    name: 'Cancun',
    length: '4 nights / 5 days',
    start: 'February 14, 2021',
    resort: 'Emerald Bay, 3-stars',
    price: '$799.00'
  },
  {
    code: 'B0103',
    name: 'Barbados',
    length: '5 nights / 6 days',
    start: 'February 28, 2021',
    resort: 'Castaway Cove, 4-stars',
    price: '$1,299.00'
  }
];

const seedDB = async () => {
  try {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log('Trips successfully seeded');
  } catch (err) {
    console.log('Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
