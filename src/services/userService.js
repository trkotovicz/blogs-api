const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const userService = {
  validateBody: (data) => {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      image: Joi.string(),
    });

    const { error, value } = schema.validate(data);
    if (error) {
      error.name = 'ValidationError';
      error.status = 400;
      throw error;
    }

    return value;
  },

  list: async () => {
    const users = await db.User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  },

  checkIfExists: async (email) => {
    const user = await db.User.findOne({ where: { email } });

    if (user) {
      const error = new Error('User already registered');
      error.name = 'ConflictError';
      error.status = 409;
      throw error;
    }
  },

  create: async ({ displayName, email, password, image }) => {
    const user = await db.User.create({ displayName, email, password, image });

    const token = await jwtService.createToken(user);
    return token;
  },

  getById: async (id) => {
    const user = await db.User.findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) {
      const error = new Error('User does not exist');
      error.name = 'NotFoundError';
      error.status = 404;
      throw error;
    }

    return user;
  },

  checkUserId: async (token) => {
    const { data } = jwtService.validateToken(token);
    return data.id;
  },

  remove: async (id) => {
    const user = await db.User.destroy({ where: { id } });
    return user;
  },
};

module.exports = userService;