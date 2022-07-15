const categoryService = require('../services/categoryService');

const categoryController = {
  create: async (req, res) => {
    const data = categoryService.validateBody(req.body);
    const category = await categoryService.create(data);

    res.status(201).json(category);
  },

};

module.exports = categoryController;