const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const database = require('./database');
const index = require('./routes/index');
const messages = require('./routes/messages');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/messages', messages);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).send(err);
});

module.exports = app;
