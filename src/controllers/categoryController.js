const categoryService = require('../services/categoryService');

const categoryController = {
  create: async (req, res) => {
    const data = categoryService.validateBody(req.body);
    const category = await categoryService.create(data);

    res.status(201).json(category);
  },

  list: async (req, res) => {
    const categories = await categoryService.list();
    res.status(200).json(categories);
  },

};

module.exports = categoryController;