require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'http://127.0.0.1',
  port: process.env.PORT || 3000,
  seedDir: process.env.SEED_DIR || 'seeds',
  db: {
    connectionMode: process.env.CONN_MODE,
    connectionString: {
      dns: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_COLLECTION}`,
      standard: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COLLECTION}`,
    },
    connectionOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      auth: { authSource: process.env.AUTH_SOURCE },
    },
  },
  auth: {
    cookieSecret: process.env.COOKIE_SECRET,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    validity: {
      accessToken: process.env.NODE_ENV === 'development' ? '30d' : '5m',
      refreshToken: process.env.NODE_ENV === 'development' ? '365d' : '7d',
    }
  },
};
