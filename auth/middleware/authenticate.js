const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const err = new Error('Unauthorized!');
    err.status = 401;
    throw err;
  }
  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
