const Joi = require('joi');
// const Sequelize = require('sequelize');
const db = require('../database/models');
const jwtService = require('./jwtService');
// const config = require('../database/config/config');

// const sequelize = new Sequelize(config.development);

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

  /* REFACTOR "create" COM TRANSACTION => EM DESENVOLVIMENTO
  checkIds: (data) => {
    const ids = data.map((category) => category.id);
    const exists = data.every((id) => ids.includes(id));

    if (!exists) {
      const error = new Error('"categoryIds" not found');
      error.name = 'NotFoundError';
      error.status = 400;
      throw error;
    }
  },

  create: async (data) => {
    const { title, content, categoryIds, userId } = data;
    const categories = await db.Category.findAll();
    await postService.checkIds(categories);

    const t = await sequelize.transaction();

    try {
      const post = await db.BlogPost.create(
        { title, content, categoryIds, userId }, { transaction: t },
      );

      await Promise.all(categoryIds.map((categoryId) =>
        db.PostCategory.create(
          { postId: post.id, categoryId }, { transaction: t },
        )));
      await t.commit();
      return post;
    } catch (error) {
      await t.rollback();
    }
  },
*/

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
  
    await Promise.all(categoryIds.map((categoryId) =>
      db.PostCategory.create({ postId: post.id, categoryId })));
  
    return post;
  },

  list: async () => {
    const posts = await db.BlogPost.findAll({
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories' },
      ],
      attributes: { exclude: ['UserId'] },
    });
    return posts;
  },

  getById: async (id) => {
    const post = await db.BlogPost.findByPk(id, {
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories' },
      ],
      attributes: { exclude: ['UserId'] },
    });

    if (!post) {
      const error = new Error('Post does not exist');
      error.name = 'NotFoundError';
      error.status = 404;
      throw error;
    }

    return post;
  },

  checkIfIsAuthorized: async (token, id) => {
    const { data } = jwtService.validateToken(token);
    const postId = await postService.getById(id);

    if (postId.userId !== data.id) {
      const error = new Error('Unauthorized user');
      error.name = 'UnauthorizedError';
      error.status = 401;
      throw error;
    }
  },

  remove: async (id) => {
    const post = await db.BlogPost.destroy({ where: { id } });

    if (!post) {
      const error = new Error('Post does not exist');
      error.name = 'NotFoundError';
      error.status = 404;
      throw error;
    }
    return post;
  },

};

module.exports = postService;