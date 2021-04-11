require('dotenv').config();

module.exports = {
  app: require('./app'),
  cors: require('./cors'),
  seeder: require('./seeder'),
  db: require('./db'),
  auth: require('./auth'),
};
