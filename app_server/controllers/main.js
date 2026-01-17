const home = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways'
  });
};

const travel = (req, res) => {
  res.render('travel', {
    title: 'Travel'
  });
};

module.exports = {
  home,
  travel
};
