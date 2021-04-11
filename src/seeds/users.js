module.exports = {
  Model: require('../auth/models/User'),
  Service: require('../auth/services/auth'),
  method: 'signup',
  data: [
    {
      name: 'Farhan Hasin Chowdhury',
      email: 'mail@farhan.info',
      password: 'secret',
    },
  ],
};
