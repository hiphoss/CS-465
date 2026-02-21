var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// CONNECT TO MONGODB (Updated for modern Mongoose)
mongoose.connect('mongodb://127.0.0.1:27017/travlr');

mongoose.connection.on('connected', function () {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', function (err) {
  console.log('MongoDB connection error:', err);
});

// REGISTER MODELS FIRST
require('./models/trips');
require('./models/user');

// THEN REQUIRE ROUTES
var indexRouter = require('./routes/index');
var tripsRouter = require('./routes/trips');
var usersRouter = require('./routes/users');

var app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', indexRouter);
app.use('/api', tripsRouter);
app.use('/users', usersRouter);

// CATCH 404
app.use(function(req, res, next) {
  next(createError(404));
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;