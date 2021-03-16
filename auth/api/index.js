const { Router } = require('express');

const routes = Router();

require('./routes/auth')(routes);
require('./routes/profile')(routes);

module.exports = routes;
