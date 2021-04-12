/**
 * Module dependencies.
 */

const cors = require('cors');
const { join } = require('path');
const logger = require('morgan');
const helmet = require('helmet');
require('pkginfo')(module, 'name');
const express = require('express');
const rfs = require('rotating-file-stream');
const { isCelebrate } = require('celebrate');
const cookieParser = require('cookie-parser');

const config = require('./config');

/**
 * app instance initialization.
 */

const app = express();

/**
 * Middleware registration.
 */

app.use(cors(config.cors));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

/**
 * Logger setup.
 */

app.use(logger('common'));
app.use(
  logger('combined', {
    stream: rfs.createStream(
      `${module.exports.name}-${new Date()
        .toISOString()
        .replace(/T.*/, '')
        .split('-')
        .reverse()
        .join('-')}.log`,
      {
        interval: '1d',
        path: join(__dirname, 'log'),
      },
    ),
  }),
);

/**
 * Route registration.
 */

require('./routes')(app);

/**
 * 404 handler.
 */

app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

/**
 * Error handler registration.
 */

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = isCelebrate(err) ? 400 : err.status || 500;
  const message =
    config.app.env === 'production' && err.status === 500 ? 'Something Went Wrong!' : err.message;

  // eslint-disable-next-line no-console
  if (status === 500) console.log(err.stack);

  res.status(status).json({
    status: status >= 500 ? 'error' : 'fail',
    message,
  });
});

module.exports = app;
