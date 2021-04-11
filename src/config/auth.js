const oneYearInHours = 8760 * 60 * 60;
const oneWeekInHours = 168 * 60 * 60;

const hoursToSeconds = (hours) => hours * 60 *60;

module.exports = {
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
          maxAge: process.env.NODE_ENV === 'development' ? hoursToSeconds(oneYearInHours) : hoursToSeconds(oneWeekInHours),
        }
      },
    },
  }