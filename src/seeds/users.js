module.exports = {
  // model to be used for seeding data
  Model: require('../auth/models/User'),
  // service to be used for business logic
  Service: require('../auth/services/auth'),
  // method used for creating new records
  method: 'signup',
  // list of data to be seeded
  data: [
    {
      name: 'Farhan Hasin Chowdhury',
      email: 'mail@farhan.info',
      password: 'secret',
    },
  ],
};
