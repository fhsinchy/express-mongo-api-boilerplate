const { Router } = require('express');

const { authenticate } = require('../../middleware');

const router = Router();

module.exports = (routes) => {
  routes.use('/profile', authenticate, router);

  router.get('/', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'User Profile.',
      data: {
        user: {
          name: req.user.name,
          email: req.user.email,
        },
      },
    });
  });
};
