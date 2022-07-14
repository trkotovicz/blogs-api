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
      error.status = 400;
      throw error;
    }

    return value;
  },

  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      const error = new Error('Invalid fields');
      error.name = 'UnauthorizedError';
      error.status = 400;
      throw error;
    }

    const token = jwtService.createToken(user);
    return token;
  },

  validateToken: async (token) => {
    const data = jwtService.validateToken(token);
    return data;
  },
};

module.exports = authService;