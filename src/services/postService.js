const Joi = require('joi');
const db = require('../database/models');

const postService = {
  validateBody: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().items(Joi.number()).required(),
    });

    const { error, value } = schema.validate(data);
    if (error) {
      error.name = 'ValidationError';
      error.status = 400;
      error.message = 'Some required fields are missing';
      throw error;
    }

    return value;
  },

  create: async (data) => {
    const { title, content, categoryIds, userId } = data;
    const categories = await db.Category.findAll();
    const ids = categories.map((category) => category.id);
    const exists = categoryIds.every((id) => ids.includes(id));

    if (!exists) {
      const error = new Error('"categoryIds" not found');
      error.name = 'NotFoundError';
      error.status = 400;
      throw error;
    }

    const post = await db.BlogPost.create({ title, content, categoryIds, userId });
    return post;
  },
};

module.exports = postService;