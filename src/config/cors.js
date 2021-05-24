const extractArray = (commaDelimitedString) =>
  commaDelimitedString ? commaDelimitedString.split(',') : false;

module.exports = {
  origin:
    process.env.NODE_ENV === 'development' ? true : extractArray(process.env.CORS_ORIGINS) || false,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: false,
};
