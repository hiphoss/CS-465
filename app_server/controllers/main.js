const fs = require('fs');
const path = require('path');

const home = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways'
  });
};

const travel = (req, res) => {
  const tripsPath = path.join(__dirname, '../data/trips.json');
  const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

  res.render('travel', {
    title: 'Travel',
    trips: trips
  });
};


module.exports = {
  home,
  travel
};
