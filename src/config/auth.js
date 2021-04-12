const nodeEnv = process.env.NODE_ENV;

const oneWeekInHours = 168 * 60 * 60;
const oneYearInHours = 8760 * 60 * 60;

const hoursToSeconds = (hours) => hours * 60 * 60;

module.exports = {
  accessToken: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    validity: nodeEnv === 'development' ? '30d' : '5m',
  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    validity: nodeEnv === 'development' ? '365d' : '7d',
    cookie: {
      secret: process.env.COOKIE_SECRET,
      options: {
        httpOnly: true,
        sameSite: nodeEnv === 'production' ? 'Strict' : 'None',
        domain: process.env.HOST,
        secure: nodeEnv !== 'development',
        maxAge:
          nodeEnv === 'development'
            ? hoursToSeconds(oneYearInHours)
            : hoursToSeconds(oneWeekInHours),
      },
    },
  },
};
