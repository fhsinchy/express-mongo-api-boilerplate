#!/usr/bin/env node

/**
 * Module dependencies.
 */

const http = require('http');
const mongoose = require('mongoose');

const app = require('../app');
const config = require('../config');

/**
 * Get port from environment and store in Express.
 */

const { host } = config.app;
const { port } = config.app;
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * ODM initialization.
 */

mongoose
  .connect(config.db.connectionString, config.db.connectionOptions)
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

/**
 * Listen on provided port, on all network interfaces.
 */
// eslint-disable-next-line no-console
console.log(`app running -> ${host}:${port}`);
server.listen(port);
