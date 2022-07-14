const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);
    if (error) {
      error.name = 'ValidationError';
      error.message = 'Some required fields are missing';
      throw error;
    }

    return value;
  },

  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      const err = new Error('Invalid fields');
      err.name = 'UnauthorizedError';
      throw err;
    }

    const token = jwtService.createToken(user);
    return token;
  },
};

module.exports = authService;