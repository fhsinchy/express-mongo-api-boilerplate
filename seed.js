/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */

require('dotenv').config();

const fs = require('fs').promises;
const mongoose = require('mongoose');

const config = require('./config');

const { seedDir } = config;

mongoose.connect(config.db.connectionString[config.db.connectionMode], config.db.connectionOptions)

mongoose.connection.on('connected', async () => {
  let files = [];

  try {
    files = await fs.readdir(require('path').join(__dirname, seedDir));
  } catch (error) {
    console.error(error);
  }

  for (const file of files) {
    const seed = require(`./${seedDir}/${file}`);

    const { data } = seed;

    const service = new seed.Service(seed.Model);

    console.log(`seeding: ${file}`);
    for (const item of data) {
      console.dir(item);
      try {
        await service[seed.method](item);
      } catch (error) {
        console.error(error);
      }
    }
    console.log('');
  }

  mongoose.connection.close(() => {
    console.log('seeding complete');
  });
});
