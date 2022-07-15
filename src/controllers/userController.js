const userService = require('../services/userService');

const userController = {
  create: async (req, res) => {
    const user = await userService.validateBody(req.body);
    await userService.checkIfExists(user.email);

    const token = await userService.create(user);
    res.status(201).json({ token });
  },

  list: async (req, res) => {
    const users = await userService.list();
    res.status(200).json(users);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(id);

    res.status(200).json(user);
  },
};

module.exports = userController;