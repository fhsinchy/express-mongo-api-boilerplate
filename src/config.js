require('dotenv').config();

const oneYearInSeconds = 8760 * 60 * 60;
const oneWeekInSeconds = 168 * 60 * 60;

module.exports = {
  app: {
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'http://127.0.0.1',
    port: process.env.PORT || 3000,
  },

  seeder: {
    seedDir: process.env.SEED_DIR || 'seeds',
  },

  db: {
    connectionMode: process.env.CONN_MODE,
    connectionString: {
      dns: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
      standard: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
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
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET,
      validity: process.env.NODE_ENV === 'development' ? '30d' : '5m',
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET,
      validity: process.env.NODE_ENV === 'development' ? '365d' : '7d',
      cookie: {
        secret: process.env.COOKIE_SECRET,
        options: {
          httpOnly: true,
          sameSite: 'Strict',
          domain: process.env.HOST,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: process.env.NODE_ENV === 'development' ? oneYearInSeconds : oneWeekInSeconds,
        }
      },
    },
  },
};
