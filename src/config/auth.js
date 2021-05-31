const nodeEnv = process.env.NODE_ENV;

const oneWeekInHours = 168 * 60 * 60;
const oneYearInHours = 8760 * 60 * 60;

const hoursToSeconds = (hours) => hours * 60 * 60;

module.exports = {
  accessToken: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    validity: nodeEnv === 'development' ? '30 days' : '5m',
  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    validity: nodeEnv === 'development' ? '365 days' : '7 days',
    cookie: {
      secret: process.env.COOKIE_SECRET,
      options: {
        httpOnly: true,
        sameSite: nodeEnv === 'development' ? 'None' : 'Strict',
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
