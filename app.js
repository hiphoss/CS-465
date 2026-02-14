var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
require('./models/trips');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var tripsRouter = require('./routes/trips');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/travlr');

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
require('./models/trips');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', tripsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
