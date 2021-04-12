module.exports = {
  connectionString: `mongodb${process.env.CONNECTION_MODE === 'dns' ? '+srv' : ''}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    auth: { authSource: process.env.AUTH_SOURCE },
  },
};
