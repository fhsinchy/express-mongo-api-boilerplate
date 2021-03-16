const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../config');

module.exports = class AuthService {
  constructor(User) {
    this.User = User;
  }

  async signup(params) {
    if (await this.User.findOne({ email: params.email }).exec()) {
      const err = new Error('Email Already Taken!');
      err.status = 400;
      throw err;
    } else {
      const user = await this.User.create({
        name: params.name,
        email: params.email,
        password: await bcrypt.hash(params.password, 12),
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
  }

  async login(params) {
    const user = await this.User.findOne({ email: params.email }).exec();

    if (!user) {
      const err = new Error('Wrong Email!');
      err.status = 400;
      throw err;
    } else if (await bcrypt.compare(params.password, user.password)) {
      const tokenPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const accessToken = jwt.sign(tokenPayload, config.auth.accessTokenSecret, {
        expiresIn: config.auth.validity.accessToken,
      });

      const refreshToken = jwt.sign(tokenPayload, config.auth.refreshTokenSecret);

      return {
        accessToken,
        refreshToken,
      };
    } else {
      const err = new Error('Wrong Password!');
      err.status = 400;
      throw err;
    }
  }

  static refresh(refreshToken) {
    const user = jwt.verify(refreshToken, config.auth.refreshTokenSecret);

    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = jwt.sign(tokenPayload, config.auth.accessTokenSecret, {
      expiresIn: config.auth.validity.accessToken,
    });

    return { accessToken };
  }
};
